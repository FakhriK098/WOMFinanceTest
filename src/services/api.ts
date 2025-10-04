import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
})

api.interceptors.response.use(
  r => r,
  error => {
    if (error.response && error.response.status >= 500) {
      return Promise.reject(new Error('Terjadi kesalahan server'))
    }
    return Promise.reject(error)
  }
)
