// src/components/MusicPlayer/MusicPlayer.jsx
import { motion } from 'framer-motion'
import { FaMusic, FaVolumeMute } from 'react-icons/fa'
import { useAudio } from '../../contexts/AudioContext'

export default function MusicPlayer() {
  const { isPlaying, toggle } = useAudio()

  return (
    <motion.button
      onClick={toggle}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isPlaying ? 'Вимкнути музику' : 'Увімкнути музику'}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 md:w-14 md:h-14
        rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600
        text-white shadow-xl shadow-rose-300 dark:shadow-rose-900
        flex items-center justify-center cursor-pointer"
    >
      {isPlaying && (
        <>
          <span className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-30" />
          <span className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-20"
            style={{ animationDelay: '0.5s' }} />
        </>
      )}
      {isPlaying
        ? <FaMusic    className="text-lg md:text-xl relative z-10" />
        : <FaVolumeMute className="text-lg md:text-xl relative z-10" />
      }
    </motion.button>
  )
}