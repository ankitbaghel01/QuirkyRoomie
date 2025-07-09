import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, MessageSquare, Trophy, Sparkles } from 'lucide-react'

function Home() {
  const floatingElements = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
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
              left: `${10 + i * 8}%`,
              top: `${20 + i * 6}%`
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ animationDelay: '2s' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl w-full mx-auto px-8 py-16"
      >
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 text-center p-12"
        >
          {/* Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl"
          >
            <Sparkles className="w-12 h-12 text-white animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6"
          >
            Welcome to QuirkyRoomie!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl md:text-2xl text-purple-200/80 mb-6"
          >
            Resolve flatmate conflicts with fun, voting, and a touch of humor.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-lg md:text-xl text-purple-100/80 mb-12"
          >
            File complaints, vote on issues, and earn karma for being the best flatmate!
          </motion.p>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <MessageSquare className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">File Complaints</h3>
              <p className="text-purple-200/80">Express your concerns with style and humor</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Vote & Decide</h3>
              <p className="text-purple-200/80">Democratic resolution through community voting</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Earn Karma</h3>
              <p className="text-purple-200/80">Build your reputation as the best flatmate</p>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-semibold text-lg shadow-lg border border-white/20 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"
                animate={{
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <Link to="/complaints">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                View Complaints
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Home