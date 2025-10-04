import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@services/api';
import type {
  EvolutionChainResponse,
  PokemonDetailResponse,
  PokemonSpeciesResponse,
  PokemonDetailView,
  EvolutionEntry,
} from '@typings/pokemon';
import { extractIdFromUrl, getSpeciesColor } from '@utils/pokemon';

type DetailState = {
  data: PokemonDetailView | null;
  loading: boolean;
  error: string | null;
};

const initialState: DetailState = {
  data: null,
  loading: false,
  error: null,
};

const collectSprites = (sprites: PokemonDetailResponse['sprites']) => {
  const list: (string | null | undefined)[] = [
    sprites.other?.['official-artwork']?.front_default,
    sprites.front_default,
    sprites.back_default,
    sprites.front_shiny,
    sprites.back_shiny,
  ];
  return list.filter(Boolean) as string[];
};

const flattenChain = (
  node: EvolutionChainResponse['chain'],
): { name: string; url: string }[] => {
  const arr: { name: string; url: string }[] = [];
  const visit = (n: any) => {
    arr.push({ name: n.species.name, url: n.species.url });
    if (Array.isArray(n.evolves_to)) n.evolves_to.forEach(visit);
  };
  visit(node);
  return arr;
};

export const fetchPokemonDetail = createAsyncThunk(
  'pokemonDetail/fetch',
  async (id: number, { rejectWithValue }) => {
    try {
      const detailRes = await api.get<PokemonDetailResponse>(`/pokemon/${id}`);
      const detail = detailRes.data;
      const speciesRes = await api.get<PokemonSpeciesResponse>(
        detail.species.url,
      );
      const color = getSpeciesColor(speciesRes.data.color?.name);
      const evoUrl = speciesRes.data.evolution_chain.url;
      const evoRes = await api.get<EvolutionChainResponse>(evoUrl);
      const flattened = flattenChain(evoRes.data.chain);
      const evoEntries = await Promise.all(
        flattened.map(async s => {
          const sid = extractIdFromUrl(s.url);
          if (!sid) return null;
          try {
            const dr = await api.get<PokemonDetailResponse>(`/pokemon/${sid}`);
            const img =
              dr.data.sprites.other?.['official-artwork']?.front_default ||
              dr.data.sprites.front_default ||
              null;
            const entry: EvolutionEntry = {
              id: sid,
              name: dr.data.name,
              image: img,
            };
            return entry;
          } catch {
            return null;
          }
        }),
      );
      const evolutions = evoEntries.filter(Boolean) as EvolutionEntry[];
      const data: PokemonDetailView = {
        id: detail.id,
        name: detail.name,
        color,
        image:
          detail.sprites.other?.['official-artwork']?.front_default ||
          detail.sprites.front_default ||
          null,
        types: detail.types.map(t => t.type.name),
        height: detail.height,
        weight: detail.weight,
        base_experience: detail.base_experience,
        abilities: detail.abilities.map(a => a.ability.name),
        sprites: collectSprites(detail.sprites),
        evolutions,
      };
      return data;
    } catch (e) {
      return rejectWithValue('Gagal memuat detail');
    }
  },
);

const slice = createSlice({
  name: 'pokemonDetail',
  initialState,
  reducers: {
    clearDetail: state => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPokemonDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPokemonDetail.fulfilled,
        (state, action: PayloadAction<PokemonDetailView>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchPokemonDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Terjadi kesalahan';
      });
  },
});

export const { clearDetail } = slice.actions;
export default slice.reducer;
