import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setItem, getItem, removeItem } from '@utils/storage';
import type { AuthState } from '@typings/auth';

const initialState: AuthState = {
  token: null,
  expiresAt: null,
  email: null,
  loading: false,
  error: null,
  initialized: false,
};

const TOKEN_KEY = 'auth_token';
const EXPIRES_KEY = 'auth_expires';
const EMAIL_KEY = 'auth_email';

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const generateToken = (email: string) =>
  `${Math.random().toString(36).slice(2)}.${Date.now().toString(
    36,
  )}.${email.replace(/[^a-zA-Z0-9]/g, '')}`;

export const initAuth = createAsyncThunk('auth/init', async () => {
  const [token, expires, email] = await Promise.all([
    getItem(TOKEN_KEY),
    getItem(EXPIRES_KEY),
    getItem(EMAIL_KEY),
  ]);
  const now = Date.now();
  if (!token || !expires) return { token: null, expiresAt: null, email: null };
  const expNum = Number(expires);
  if (Number.isNaN(expNum) || expNum <= now) {
    await Promise.all([
      removeItem(TOKEN_KEY),
      removeItem(EXPIRES_KEY),
      removeItem(EMAIL_KEY),
    ]);
    return { token: null, expiresAt: null, email: null };
  }
  return { token, expiresAt: expNum, email };
});

export const login = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      if (!email || !password) return rejectWithValue('Isi email dan password');
      if (!isValidEmail(email))
        return rejectWithValue('Format email tidak valid');
      if (password.length < 6)
        return rejectWithValue('Password minimal 6 karakter');
      const token = generateToken(email);
      const expiresAt = Date.now() + 60 * 60 * 1000;
      await Promise.all([
        setItem(TOKEN_KEY, token),
        setItem(EXPIRES_KEY, String(expiresAt)),
        setItem(EMAIL_KEY, email),
      ]);
      return { token, expiresAt, email };
    } catch (e) {
      return rejectWithValue('Gagal menyimpan sesi');
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await Promise.all([
    removeItem(TOKEN_KEY),
    removeItem(EXPIRES_KEY),
    removeItem(EMAIL_KEY),
  ]);
  return true;
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initAuth.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        initAuth.fulfilled,
        (
          state,
          action: PayloadAction<{
            token: string | null;
            expiresAt: number | null;
            email: string | null;
          }>,
        ) => {
          state.loading = false;
          state.initialized = true;
          state.token = action.payload.token;
          state.expiresAt = action.payload.expiresAt;
          state.email = action.payload.email;
        },
      )
      .addCase(initAuth.rejected, state => {
        state.loading = false;
        state.initialized = true;
      })
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{
            token: string;
            expiresAt: number;
            email: string;
          }>,
        ) => {
          state.loading = false;
          state.token = action.payload.token;
          state.expiresAt = action.payload.expiresAt;
          state.email = action.payload.email;
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Gagal masuk';
      })
      .addCase(logout.fulfilled, state => {
        state.token = null;
        state.expiresAt = null;
        state.email = null;
      });
  },
});

export default slice.reducer;
