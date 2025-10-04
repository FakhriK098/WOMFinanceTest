import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@services/api';
import type {
  PokemonPageResponse,
  PokemonDetailResponse,
  PokemonSpeciesResponse,
  PokemonListItem,
} from '@typings/pokemon';
import { extractIdFromUrl, getSpeciesColor } from '@utils/pokemon';

type PokemonState = {
  items: PokemonListItem[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  nextUrl: string | null;
};

const initialState: PokemonState = {
  items: [],
  loading: false,
  refreshing: false,
  error: null,
  nextUrl: null,
};

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetch',
  async (
    { reset = false }: { reset?: boolean },
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as { pokemon: PokemonState };
      const base = '/pokemon?limit=20';
      const url = reset ? base : state.pokemon.nextUrl || base;
      const page = await api.get<PokemonPageResponse>(url);
      const list = page.data.results;

      const items = await Promise.all(
        list.map(async r => {
          try {
            const id = extractIdFromUrl(r.url);
            if (!id) return null;
            const detail = await api.get<PokemonDetailResponse>(
              `/pokemon/${id}`,
            );
            const image =
              detail.data.sprites.other?.['official-artwork']?.front_default ||
              null;
            const types = detail.data.types.map(t => t.type.name);
            const species = await api.get<PokemonSpeciesResponse>(
              detail.data.species.url,
            );
            const color = getSpeciesColor(species.data.color?.name);
            const item: PokemonListItem = {
              id,
              name: detail.data.name,
              image,
              types,
              color,
            };
            return item;
          } catch {
            return null;
          }
        }),
      );
      const compact = items.filter(Boolean) as PokemonListItem[];
      return { items: compact, next: page.data.next || null, reset };
    } catch (e) {
      return rejectWithValue('Gagal memuat data');
    }
  },
);

const slice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemons.pending, (state, action) => {
        const reset = (action.meta.arg as { reset?: boolean })?.reset;
        if (reset) state.refreshing = true;
        else state.loading = state.items.length === 0;
        state.error = null;
      })
      .addCase(
        fetchPokemons.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: PokemonListItem[];
            next: string | null;
            reset?: boolean;
          }>,
        ) => {
          state.loading = false;
          state.refreshing = false;
          state.error = null;
          state.nextUrl = action.payload.next;
          state.items = action.payload.reset
            ? action.payload.items
            : [...state.items, ...action.payload.items];
        },
      )
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.error = (action.payload as string) || 'Terjadi kesalahan';
      });
  },
});

export default slice.reducer;
