import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../contexts/AuthContext'

function AuthForm({ isRegister = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    flatCode: '',
  })
  const { login, register } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isRegister) {
        await register(formData)
      } else {
        await login({ email: formData.email, password: formData.password })
      }
      navigate('/')
    } catch (error) {
      console.error(`${isRegister ? 'Registration' : 'Login'} failed:`, error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto p-4 max-w-md"
    >
      <h1 className="text-3xl font-bold text-primary mb-4">
        {isRegister ? 'Register' : 'Login'}
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
          required
        />
        {isRegister && (
          <input
            type="text"
            name="flatCode"
            placeholder="Flat Code"
            value={formData.flatCode}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        )}
        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-accent w-full transition-colors"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>
      </div>
    </motion.div>
  )
}

export default AuthForm