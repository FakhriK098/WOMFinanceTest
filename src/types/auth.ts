export type AuthState = {
  token: string | null
  expiresAt: number | null
  email: string | null
  loading: boolean
  error: string | null
  initialized: boolean
}
