import { useState, useEffect, useContext } from 'react';
import { Trophy, Medal, Crown, Star, TrendingUp, Users, Award, ChevronUp, ChevronDown, Zap, Target, RefreshCw, AlertCircle } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom'; // For redirecting unauthenticated users
import api from '../services/api'; // Same API service as Complaints.jsx

function LeaderboardPage() {
  const { user, loading: authLoading } = useContext(AuthContext); // Get user and loading state
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ topCategories: {}, mostComplainedUser: null }); // For /api/flat/stats
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return; // Wait for AuthContext to load
    if (!user) {
      setError('You must be logged in to view the leaderboard');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        // Fetch leaderboard and stats concurrently
        const [leaderboardRes, statsRes] = await Promise.all([
          api.get('/api/leaderboard'),
          api.get('/api/flat/stats'),
        ]);

        // Map leaderboard data to match frontend format
        const mappedUsers = leaderboardRes.data.map((user, index) => ({
          id: user._id,
          name: user.name,
          score: user.karmaPoints,
          rank: index + 1,
          change: Math.floor(Math.random() * 5) - 2, // Simulate rank change
          avatar: getAvatar(index + 1), // Generate avatar based on rank
          level: getLevel(user.karmaPoints), // Derive level from karmaPoints
          badges: getBadges(user.karmaPoints), // Generate badges
        }));

        setUsers(mappedUsers);
        setStats(statsRes.data);
        setError(null);
      } catch (error) {
        console.error('Fetch leaderboard failed:', error);
        setError(error.response?.data?.error || 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authLoading, user]);

  const handleRefresh = async () => {
    if (!user) {
      setError('You must be logged in to refresh the leaderboard');
      return;
    }
    setRefreshing(true);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      const [leaderboardRes, statsRes] = await Promise.all([
        api.get('/api/leaderboard'),
        api.get('/api/flat/stats'),
      ]);

      const mappedUsers = leaderboardRes.data.map((user, index) => ({
        id: user._id,
        name: user.name,
        score: user.karmaPoints,
        rank: index + 1,
        change: Math.floor(Math.random() * 5) - 2,
        avatar: getAvatar(index + 1),
        level: getLevel(user.karmaPoints),
        badges: getBadges(user.karmaPoints),
      }));

      setUsers(mappedUsers);
      setStats(statsRes.data);
      setError(null);
    } catch (error) {
      console.error('Refresh failed:', error);
      setError(error.response?.data?.error || 'Failed to refresh leaderboard');
    } finally {
      setRefreshing(false);
    }
  };

  // Helper functions to map backend data to frontend format
  const getAvatar = (rank) => {
    switch (rank) {
      case 1: return '🏆';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return ['🏅', '⭐', '🎖️', '🥇'][Math.floor(Math.random() * 4)];
    }
  };

  const getLevel = (score) => {
    if (score >= 50) return 'Master';
    if (score >= 30) return 'Expert';
    if (score >= 20) return 'Advanced';
    return 'Intermediate';
  };

  const getBadges = (score) => {
    const badges = [];
    if (score >= 50) badges.push('🔥');
    if (score >= 40) badges.push('⚡');
    if (score >= 30) badges.push('🎯');
    if (score >= 20) badges.push('🌟');
    return badges;
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <Trophy className="w-5 h-5 text-purple-400" />;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-orange-500';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-amber-400 to-amber-600';
      default: return 'from-purple-400 to-pink-500';
    }
  };

  const getChangeIndicator = (change) => {
    if (change > 0) return <ChevronUp className="w-4 h-4 text-green-400" />;
    if (change < 0) return <ChevronDown className="w-4 h-4 text-red-400" />;
    return <div className="w-4 h-4 bg-gray-500 rounded-full" />;
  };

  const floatingElements = Array.from({ length: 12 }, (_, i) => i);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-purple-200 text-xl">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 text-xl mb-4">Please log in to view the leaderboard</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {floatingElements.map((i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <Trophy className="w-4 h-4 text-purple-300/20" />
          </div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 hover:scale-110 transition-transform duration-300 shadow-2xl">
            <Crown className="w-12 h-12 text-white animate-pulse" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            Leaderboard
          </h1>
          <p className="text-purple-200/80 text-xl mb-6">Compete with your flatmates</p>

          {/* Stats Cards */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">{users.length}</span>
                <span className="text-purple-200/60">Flatmates</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">Live</span>
                <span className="text-purple-200/60">Updates</span>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-colors group"
              disabled={refreshing}
            >
              <RefreshCw className={`w-5 h-5 text-purple-400 group-hover:text-white transition-colors ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Flat Stats Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Flat Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-purple-200">Top Complaint Categories</h3>
                {Object.keys(stats.topCategories).length === 0 ? (
                  <p className="text-purple-200/60">No complaints yet</p>
                ) : (
                  <ul className="space-y-2">
                    {Object.entries(stats.topCategories).map(([type, count]) => (
                      <li key={type} className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-purple-200">{type}: {count} complaints</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-200">Most Complained About</h3>
                {stats.mostComplainedUser ? (
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-red-400" />
                    <span className="text-purple-200">
                      {stats.mostComplainedUser.name}: {stats.mostComplainedUser.complaintsFiledAgainst} complaints
                    </span>
                  </div>
                ) : (
                  <p className="text-purple-200/60">No complaints filed yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end gap-8 mb-16">
          {/* 2nd Place */}
          {users[1] && (
            <div className="text-center">
              <div className="relative">
                <div className="w-24 h-32 bg-gradient-to-t from-gray-600 to-gray-400 rounded-t-2xl flex items-end justify-center pb-4 shadow-2xl">
                  <span className="text-white font-bold text-lg">2nd</span>
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-2xl">{users[1].avatar}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-white font-bold text-lg">{users[1].name}</h3>
                <p className="text-purple-200/80">{users[1].score.toLocaleString()}</p>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {users[0] && (
            <div className="text-center">
              <div className="relative">
                <div className="w-24 h-40 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-2xl flex items-end justify-center pb-4 shadow-2xl">
                  <span className="text-white font-bold text-xl">1st</span>
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-pulse">
                    <span className="text-3xl">{users[0].avatar}</span>
                  </div>
                </div>
                <Crown className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-8 h-8 text-yellow-400 animate-bounce" />
              </div>
              <div className="mt-4">
                <h3 className="text-white font-bold text-xl">{users[0].name}</h3>
                <p className="text-purple-200/80 text-lg">{users[0].score.toLocaleString()}</p>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {users[2] && (
            <div className="text-center">
              <div className="relative">
                <div className="w-24 h-28 bg-gradient-to-t from-amber-700 to-amber-500 rounded-t-2xl flex items-end justify-center pb-4 shadow-2xl">
                  <span className="text-white font-bold text-lg">3rd</span>
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-2xl">{users[2].avatar}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-white font-bold text-lg">{users[2].name}</h3>
                <p className="text-purple-200/80">{users[2].score.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Full Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Full Rankings</h2>
            </div>
            <div className="space-y-2 p-6">
              {users.map((user, index) => (
                <div
                  key={user.id}
                  className="group relative bg-white/5 hover:bg-white/10 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className="flex items-center space-x-2">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRankColor(user.rank)} flex items-center justify-center font-bold text-white shadow-lg`}>
                          {user.rank <= 3 ? getRankIcon(user.rank) : user.rank}
                        </div>
                        {getChangeIndicator(user.change)}
                      </div>
                      {/* Avatar and Info */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-2xl">
                          {user.avatar}
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{user.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-purple-200/60">{user.level}</span>
                            <div className="flex space-x-1">
                              {user.badges.map((badge, i) => (
                                <span key={i} className="text-sm">{badge}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Score */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{user.score.toLocaleString()}</div>
                      <div className="flex items-center space-x-1 text-purple-200/60">
                        <Target className="w-4 h-4" />
                        <span>pts</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-purple-200/60">
          <p>Updated every 5 minutes • Live rankings</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default LeaderboardPage;