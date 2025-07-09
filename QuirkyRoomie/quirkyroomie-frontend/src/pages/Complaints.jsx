import { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { Plus, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import ComplaintCard from '../components/ComplaintCard'
import ComplaintForm from '../components/ComplaintForm'
import api from '../services/api'
import { AuthContext } from '../contexts/AuthContext'

function Complaints() {
  const { user, loading } = useContext(AuthContext)
  const [complaints, setComplaints] = useState([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const fetchComplaints = async () => {
    try {
      setFetching(true)
      setError(null)
      const token = localStorage.getItem('token')
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        delete api.defaults.headers.common['Authorization']
      }
      const res = await api.get('/api/complaints')
      setComplaints(res.data)
    } catch (error) {
      console.error('Fetch complaints failed:', error)
      setError('Failed to load complaints. Please try again.')
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    if (!loading) {
      fetchComplaints()
    }
    // eslint-disable-next-line
  }, [loading])

  const handleVote = (complaintId, voteType) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c._id === complaintId
          ? {
              ...c,
              upvotes: voteType === 'upvote' ? c.upvotes + 1 : c.upvotes,
              downvotes: voteType === 'downvote' ? c.downvotes + 1 : c.downvotes,
            }
          : c,
      ),
    )
  }

  const handleResolve = (complaintId) => {
    setComplaints((prev) => prev.filter((c) => c._id !== complaintId))
  }

  const handleComplaintAdded = () => {
    fetchComplaints()
    setShowForm(false)
  }

  const floatingElements = Array.from({ length: 8 }, (_, i) => i)

  if (loading || fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4"
          />
          <p className="text-purple-200 text-xl">Loading complaints...</p>
        </motion.div>
      </div>
    )
  }

  // If not logged in, render nothing (ProtectedRoute will handle redirect)
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
            style={{
              left: `${5 + i * 12}%`,
              top: `${15 + i * 8}%`,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-full blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ animationDelay: '1.5s' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ animationDelay: '3s' }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl"
            >
              <AlertCircle className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
              Complaints
            </h1>
            <p className="text-purple-200/80 text-xl">Resolve conflicts with style and humor</p>
          </motion.div>

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 mb-8 text-center"
            >
              <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-red-400">{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchComplaints}
                className="mt-4 px-6 py-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-colors"
              >
                Try Again
              </motion.button>
            </motion.div>
          )}

          {/* New Complaint Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(!showForm)}
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
              <span className="relative z-10 flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>{showForm ? 'Hide Form' : 'File a New Complaint'}</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Complaint Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <ComplaintForm onComplaintAdded={handleComplaintAdded} />
            </motion.div>
          )}

          {/* Complaints Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">All Complaints</h2>
                <div className="flex items-center space-x-2 text-purple-200/80">
                  <CheckCircle className="w-5 h-5" />
                  <span>{complaints.length} complaints</span>
                </div>
              </div>
            </div>

            {complaints.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-12 text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Complaints!</h3>
                <p className="text-purple-200/80">Your flat is running smoothly. Great job!</p>
              </motion.div>
            ) : (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {complaints.map((complaint, index) => (
                    <motion.div
                      key={complaint._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="transition-all duration-300"
                    >
                      <ComplaintCard
                        complaint={complaint}
                        onVote={handleVote}
                        onResolve={handleResolve}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Complaints