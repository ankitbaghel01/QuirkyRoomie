// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from 'react'
import api, { setLogoutCallback } from '../services/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  const initializeAuth = () => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error)
        logout()
      }
    } else {
      logout()
    }
    setLoading(false)
  }

  useEffect(() => {
    setLogoutCallback(() => logout)
    initializeAuth()
    return () => setLogoutCallback(null)
  }, [])

  const login = async (credentials) => {
    try {
      const res = await api.post('/api/auth/login', credentials)
      const { token } = res.data
  
      if (!token) throw new Error('Token not received')
  
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  
      // Set a basic placeholder user if no user info is returned
      const fakeUser = { id: 'unknown', email: credentials.email }
      localStorage.setItem('user', JSON.stringify(fakeUser))
      setUser(fakeUser)
  
      return { success: true }
    } catch (error) {
      logout()
      throw error
    }
  }
  

  const register = async (userData) => {
    try {
      const res = await api.post('/api/auth/register', userData)
      const { token } = res.data || {}
  
      if (!token) throw new Error('Invalid response from server')
  
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  
      // If no user object, create a basic placeholder user
      const newUser = { id: 'unknown', email: userData.email }
      localStorage.setItem('user', JSON.stringify(newUser))
      setUser(newUser)
  
      return { success: true }
    } catch (error) {
      logout()
      const message = error.response?.data?.message || error.message || 'Registration failed'
      throw new Error(message)
    }
  }
  

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
