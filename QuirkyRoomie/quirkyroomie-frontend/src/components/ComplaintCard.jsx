import { motion } from 'framer-motion'
import { useContext } from 'react'
import { ThumbsUp, ThumbsDown, CheckCircle, AlertTriangle, Calendar, User } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'
import api from '../services/api'

function ComplaintCard({ complaint, onVote, onResolve }) {
  const { user } = useContext(AuthContext)

  const handleVote = async (voteType) => {
    try {
      await api.post(`/api/complaints/${complaint._id}/vote`, { voteType })
      onVote(complaint._id, voteType)
    } catch (error) {
      console.error('Vote failed:', error)
    }
  }

  const handleResolve = async () => {
    try {
      await api.put(`/api/complaints/${complaint._id}/resolve`)
      onResolve(complaint._id)
    } catch (error) {
      console.error('Resolve failed:', error)
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Nuclear': return 'from-red-500 to-red-600'
      case 'Major': return 'from-orange-500 to-orange-600'
      case 'Annoying': return 'from-yellow-500 to-yellow-600'
      default: return 'from-green-500 to-green-600'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Nuclear': return <AlertTriangle className="w-4 h-4" />
      case 'Major': return <AlertTriangle className="w-4 h-4" />
      case 'Annoying': return <AlertTriangle className="w-4 h-4" />
      default: return <CheckCircle className="w-4 h-4" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
            {complaint.title}
          </h3>
          <p className="text-purple-200/80 text-sm leading-relaxed">
            {complaint.description}
          </p>
        </div>
      </div>

      {/* Severity and Date */}
      <div className="flex items-center justify-between mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${getSeverityColor(complaint.severity)} text-white text-sm font-medium shadow-lg`}
        >
          {getSeverityIcon(complaint.severity)}
          <span>{complaint.severity}</span>
        </motion.div>
        
        <div className="flex items-center space-x-2 text-purple-200/60 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Author Info */}
      {complaint.createdBy && (
        <div className="flex items-center space-x-2 mb-6 p-3 bg-white/5 rounded-xl border border-white/10">
          <User className="w-4 h-4 text-purple-300" />
          <span className="text-purple-200/80 text-sm">
            Filed by {complaint.createdBy.name || 'Anonymous'}
          </span>
        </div>
      )}

      {/* Voting Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVote('upvote')}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-xl border border-green-500/30 transition-all duration-300 group"
          >
            <ThumbsUp className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors" />
            <span className="text-green-400 group-hover:text-green-300 transition-colors font-medium">
              {complaint.upvotes}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVote('downvote')}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl border border-red-500/30 transition-all duration-300 group"
          >
            <ThumbsDown className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
            <span className="text-red-400 group-hover:text-red-300 transition-colors font-medium">
              {complaint.downvotes}
            </span>
          </motion.button>
        </div>

        {/* Resolve Button */}
        {user && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResolve}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-xl text-white font-medium shadow-lg transition-all duration-300"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Resolve</span>
          </motion.button>
        )}
      </div>

      {/* Punishment Warning */}
      {complaint.upvotes >= 10 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl"
        >
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-semibold">Punishment Triggered!</span>
          </div>
          <p className="text-red-300/80 text-sm">
            {complaint.punishment || 'Make chai for everyone for a week!'}
          </p>
        </motion.div>
      )}

      {/* Type Badge */}
      <div className="mt-4 flex justify-end">
        <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-xs font-medium">
          {complaint.type}
        </span>
      </div>
    </motion.div>
  )
}

export default ComplaintCard