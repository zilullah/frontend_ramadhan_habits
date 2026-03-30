import api from './api.service'

export interface User {
  id: string
  email: string
  name: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export const authService = {
  async register(data: { email: string; password: string; name: string }) {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  async login(data: { email: string; password: string }): Promise<LoginResponse> {
    const response = await api.post('/auth/login', data)
    const { accessToken, user } = response.data
    localStorage.setItem('auth_token', accessToken)
    localStorage.setItem('auth_user', JSON.stringify(user))
    return response.data
  },

  getUser(): User | null {
    const user = localStorage.getItem('auth_user')
    return user ? JSON.parse(user) : null
  },

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token')
  },

  logout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }
}
