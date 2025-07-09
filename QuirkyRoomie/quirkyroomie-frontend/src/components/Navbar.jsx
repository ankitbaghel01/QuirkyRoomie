import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Home, MessageSquare, Trophy, User, Menu, X } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'
import { useState } from 'react'

function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/complaints', label: 'Complaints', icon: MessageSquare },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  ]

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-xl text-white shadow-2xl border-b border-white/20 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              QuirkyRoomie
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div
                key={item.to}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.to}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <item.icon className="w-5 h-5 group-hover:text-purple-300 transition-colors" />
                  <span className="font-medium group-hover:text-purple-200 transition-colors">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* User Section */}
            {user ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-xl border border-white/20"
                >
                  <User className="w-5 h-5 text-purple-300" />
                  <span className="font-medium text-purple-200">{user.name}</span>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl border border-red-500/30 transition-all duration-300 group"
                >
                  <LogOut className="w-5 h-5 group-hover:text-red-300 transition-colors" />
                  <span className="font-medium group-hover:text-red-200 transition-colors">
                    Logout
                  </span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300 font-medium"
                  >
                    Login
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-xl transition-all duration-300 font-medium shadow-lg"
                  >
                    Register
                  </Link>
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-white/20">
            {navItems.map((item) => (
              <motion.div
                key={item.to}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <item.icon className="w-5 h-5 group-hover:text-purple-300 transition-colors" />
                  <span className="font-medium group-hover:text-purple-200 transition-colors">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* Mobile User Section */}
            {user ? (
              <div className="space-y-4 pt-4 border-t border-white/20">
                <div className="flex items-center space-x-3 px-4 py-3 bg-white/10 rounded-xl border border-white/20">
                  <User className="w-5 h-5 text-purple-300" />
                  <span className="font-medium text-purple-200">{user.name}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl border border-red-500/30 transition-all duration-300 group"
                >
                  <LogOut className="w-5 h-5 group-hover:text-red-300 transition-colors" />
                  <span className="font-medium group-hover:text-red-200 transition-colors">
                    Logout
                  </span>
                </motion.button>
              </div>
            ) : (
              <div className="space-y-4 pt-4 border-t border-white/20">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full block px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300 font-medium text-center"
                  >
                    Login
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full block px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-xl transition-all duration-300 font-medium text-center shadow-lg"
                  >
                    Register
                  </Link>
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar