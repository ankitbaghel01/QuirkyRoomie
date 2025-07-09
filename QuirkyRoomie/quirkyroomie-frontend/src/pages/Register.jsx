import { useState, useContext } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Home, ArrowRight, Sparkles, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    flatCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [completedFields, setCompletedFields] = useState({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    const errors = {};
    switch (name) {
      case 'name':
        if (!value.trim()) errors.name = 'Name is required';
        else if (value.length < 2) errors.name = 'Name must be at least 2 characters';
        break;
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) errors.email = 'Email is required';
        else if (!emailRegex.test(value)) errors.email = 'Please enter a valid email';
        break;
      }
      case 'password':
        if (!value) errors.password = 'Password is required';
        else if (value.length < 8) errors.password = 'Password must be at least 8 characters';
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
          errors.password = 'Password must contain uppercase, lowercase, and number';
        break;
      case 'flatCode':
        if (!value.trim()) errors.flatCode = 'Flat code is required';
        else if (value.length < 3) errors.flatCode = 'Flat code must be at least 3 characters';
        break;
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const errors = validateField(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: errors[name] }));

    if (!errors[name] && value.trim()) {
      setCompletedFields((prev) => ({ ...prev, [name]: true }));
    } else {
      setCompletedFields((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // prevent double submit

    setIsLoading(true);
    setApiError('');
    setSuccess(false);

    const allErrors = {};
    Object.keys(formData).forEach((key) => {
      const fieldErrors = validateField(key, formData[key]);
      if (fieldErrors[key]) allErrors[key] = fieldErrors[key];
    });

    if (Object.keys(allErrors).length > 0) {
      setValidationErrors(allErrors);
      setIsLoading(false);
      return;
    }

    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      // safer error message extraction:
      setApiError(
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error.message ||
        'Registration failed'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const floatingElements = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/20 rounded-full"
            style={{
              left: `${5 + i * 12}%`,
              top: `${15 + i * 8}%`,
            }}
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
          />
        ))}
      </div>
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-full blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ animationDelay: '1.5s' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ animationDelay: '3s' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-lg animate-fade-in"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </motion.div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
            Join Us
          </h1>
          <p className="text-purple-200/80 text-xl">Create your account and get started</p>
        </div>
        {/* Registration Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          <div className="space-y-6">
            {/* Name Field */}
            <motion.div className="relative group" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-sm"
                animate={{ opacity: focusedField === 'name' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5 z-10" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  required
                />
                {completedFields.name && (
                  <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5 z-10" />
                )}
                {validationErrors.name && (
                  <X className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5 z-10" />
                )}
              </div>
              {validationErrors.name && <p className="text-red-400 text-sm mt-1 ml-2">{validationErrors.name}</p>}
            </motion.div>
            {/* Email Field */}
            <motion.div className="relative group" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-sm"
                animate={{ opacity: focusedField === 'email' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5 z-10" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  required
                />
                {completedFields.email && (
                  <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5 z-10" />
                )}
                {validationErrors.email && (
                  <X className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5 z-10" />
                )}
              </div>
              {validationErrors.email && <p className="text-red-400 text-sm mt-1 ml-2">{validationErrors.email}</p>}
            </motion.div>
            {/* Password Field */}
            <motion.div className="relative group" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-sm"
                animate={{ opacity: focusedField === 'password' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5 z-10" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors duration-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {completedFields.password && (
                  <Check className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5 z-10" />
                )}
                {validationErrors.password && (
                  <X className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5 z-10" />
                )}
              </div>
              {validationErrors.password && (
                <p className="text-red-400 text-sm mt-1 ml-2">{validationErrors.password}</p>
              )}
              {/* Password Strength Meter */}
              {formData.password && (
                <div className="mt-2">
                  <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${strengthColors[Math.min(passwordStrength - 1, 4)]}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-purple-300 mt-1 text-sm">
                    Strength: {strengthLabels[Math.min(passwordStrength - 1, 4)] || 'Very Weak'}
                  </p>
                </div>
              )}
            </motion.div>
            {/* Flat Code Field */}
            <motion.div className="relative group" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-sm"
                animate={{ opacity: focusedField === 'flatCode' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative">
                <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5 z-10" />
                <input
                  type="text"
                  name="flatCode"
                  placeholder="Flat Code"
                  value={formData.flatCode}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('flatCode')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  required
                />
                {completedFields.flatCode && (
                  <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5 z-10" />
                )}
                {validationErrors.flatCode && (
                  <X className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5 z-10" />
                )}
              </div>
              {validationErrors.flatCode && <p className="text-red-400 text-sm mt-1 ml-2">{validationErrors.flatCode}</p>}
            </motion.div>
            {/* API Error Message */}
            {apiError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-center font-semibold mt-2"
                role="alert"
              >
                {apiError}
              </motion.p>
            )}
            {/* Success Message */}
            {success && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 text-center font-semibold mt-2"
                role="alert"
              >
                Registration successful! Redirecting...
              </motion.p>
            )}
            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              className={`w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                isLoading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Registering...' : 'Register'}
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </motion.button>
            {/* Link to Login */}
            <p className="text-purple-300 text-center mt-4">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-pink-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-pink-400 rounded"
              >
                Login here
              </Link>
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default Register;
