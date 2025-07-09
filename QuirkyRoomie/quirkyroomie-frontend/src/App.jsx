// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from './contexts/AuthContext'
import { useContext } from 'react'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Complaints from './pages/Complaints'
import Login from './pages/Login'
import Register from './pages/Register'
import LeaderboardPage from './pages/LeaderboardPage'

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>
  if (!user) return <Navigate to="/login" replace />

  return (
    <>
      <Navbar />
      <main className="">{children}</main>
    </>
  )
}

function GuestRoute({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>
  if (user) return <Navigate to="/home" replace />

  return children
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        } />

        <Route path="/register" element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        } />

        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/complaints" element={
          <ProtectedRoute>
            <Complaints />
          </ProtectedRoute>
        } />

        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        } />

        {/* Default fallback route */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
