import { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [error, setError] = useState('')
  const { user, login, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate('/home', { replace: true })
    }
  }, [user, loading, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      await login(formData)
      // Redirect happens in useEffect
    } catch (err) {
      const msg = err?.response?.data?.error || 'Login failed. Please try again.'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeOut"
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const floatingElements = Array.from({ length: 6 }, (_, i) => i)

  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-white text-xl">Redirecting...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        {floatingElements.map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <motion.div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Form Card */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 w-full max-w-md">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-purple-200/80 text-lg">Sign in to your account</p>
        </motion.div>

        {/* Login Form */}
        <motion.div variants={itemVariants} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error message */}
            {error && (
              <motion.div className="text-red-400 text-sm font-medium text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {error}
              </motion.div>
            )}

            {/* Email input */}
            <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-sm"
                animate={{ opacity: focusedField === 'email' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5 z-10" />
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 disabled:opacity-50"
                  required
                  disabled={isLoading}
                />
              </div>
            </motion.div>

            {/* Password input */}
            <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-sm"
                animate={{ opacity: focusedField === 'password' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5 z-10" />
                <motion.input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 disabled:opacity-50"
                  required
                  disabled={isLoading}
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  tabIndex={-1}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </div>
            </motion.div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full relative group disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl py-4 px-6 flex items-center justify-center space-x-2 text-white font-semibold text-lg group-hover:from-purple-400 group-hover:to-pink-400">
                {isLoading ? (
                  <motion.div
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    <span>Sign In</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </>
                )}
              </div>
            </motion.button>

            {/* Links */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <motion.a href="#" className="text-purple-200/80 hover:text-white transition-colors inline-block"
                whileHover={{ scale: 1.05 }}
              >
                Forgot your password?
              </motion.a>
              <div className="flex items-center justify-center space-x-2 text-purple-200/60">
                <span>Don't have an account?</span>
                <Link to="/register" className="text-purple-300 hover:text-white font-semibold transition-colors">
                  Sign up
                </Link>
              </div>
            </motion.div>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center mt-8 text-purple-200/60">
          <p>© 2024 Your Company. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login
