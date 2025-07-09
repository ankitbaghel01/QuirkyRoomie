import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, AlertCircle, CheckCircle, FileText, AlertTriangle, Calendar, Tag } from 'lucide-react'
import api from '../services/api'

function ComplaintForm({ onComplaintAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Cleanliness',
    severity: 'Mild',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      await api.post('/api/complaints', formData)
      setSuccess(true)
      setFormData({ title: '', description: '', type: 'Cleanliness', severity: 'Mild' })
      setTimeout(() => {
        onComplaintAdded()
        setSuccess(false)
      }, 1500)
    } catch (error) {
      console.error('Complaint submission failed:', error)
      setError(error?.response?.data?.error || 'Failed to submit complaint. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (error) setError('')
  }

  const severityOptions = [
    { value: 'Mild', label: 'Mild', color: 'text-green-400' },
    { value: 'Annoying', label: 'Annoying', color: 'text-yellow-400' },
    { value: 'Major', label: 'Major', color: 'text-orange-400' },
    { value: 'Nuclear', label: 'Nuclear', color: 'text-red-400' },
  ]

  const typeOptions = [
    { value: 'Cleanliness', label: 'Cleanliness', icon: '🧹' },
    { value: 'Noise', label: 'Noise', icon: '🔊' },
    { value: 'Bills', label: 'Bills', icon: '💰' },
    { value: 'Pets', label: 'Pets', icon: '🐾' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-2xl"
        >
          <FileText className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
          File a Complaint
        </h2>
        <p className="text-purple-200/80">Express your concerns with style and humor</p>
      </motion.div>

      {/* Error/Success Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl mb-6"
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span className="text-red-400 text-sm">{error}</span>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl mb-6"
        >
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-green-400 text-sm">Complaint submitted successfully!</span>
        </motion.div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Title Field */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-sm"
            animate={{ opacity: focusedField === 'title' ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative">
            <input
              type="text"
              name="title"
              placeholder="Complaint title"
              value={formData.title}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('title')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
              required
            />
            <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
          </div>
        </motion.div>

        {/* Description Field */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-sm"
            animate={{ opacity: focusedField === 'description' ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative">
            <textarea
              name="description"
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('description')}
              onBlur={() => setFocusedField(null)}
              rows={4}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 resize-none"
              required
            />
            <AlertTriangle className="absolute left-4 top-4 text-purple-300 w-5 h-5" />
          </div>
        </motion.div>

        {/* Type Selection */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-sm"
            animate={{ opacity: focusedField === 'type' ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative">
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('type')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 appearance-none"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-purple-900 text-white">
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
            <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
          </div>
        </motion.div>

        {/* Severity Selection */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-sm"
            animate={{ opacity: focusedField === 'severity' ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative">
            <select
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('severity')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 appearance-none"
            >
              {severityOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-purple-900 text-white">
                  {option.label}
                </option>
              ))}
            </select>
            <AlertTriangle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
          <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl py-4 px-6 flex items-center justify-center space-x-2 text-white font-semibold text-lg transition-all duration-300 group-hover:from-purple-400 group-hover:to-pink-400">
            {isSubmitting ? (
              <motion.div
                className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ) : (
              <>
                <span>Submit Complaint</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </div>
        </motion.button>
      </motion.form>
    </motion.div>
  )
}

export default ComplaintForm