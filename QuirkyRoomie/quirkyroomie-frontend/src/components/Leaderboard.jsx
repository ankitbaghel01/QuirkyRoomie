import { motion } from 'framer-motion'

function Leaderboard({ users }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      <ul>
        {users.map((user, index) => (
          <motion.li
            key={user._id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between py-2 border-b"
          >
            <span>
              {index + 1}. {user.name}
            </span>
            <span className="text-accent">{user.karma} Karma</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export default Leaderboard