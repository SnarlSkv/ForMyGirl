// src/components/MusicPlayer/MusicPlayer.jsx
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaMusic, FaVolumeMute } from 'react-icons/fa'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const audio = new Audio('/music/background.mp3')
    audio.loop = true
    audio.volume = 0.3 // гучність 30% — щоб не злякати
    audioRef.current = audio

    audio.addEventListener('canplaythrough', () => setIsReady(true))

    // Прибираємо аудіо при виході зі сторінки
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      // play() повертає Promise — обробляємо помилку
      audio.play().catch(() => {
        console.warn('Автовідтворення заблоковано браузером')
      })
      setIsPlaying(true)
    }
  }

  // Якщо файл музики відсутній — не показуємо кнопку
  // (щоб не було помилки у консолі)
  return (
    <motion.button
      onClick={toggle}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isPlaying ? 'Вимкнути музику' : 'Увімкнути музику'}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white shadow-xl shadow-rose-300 dark:shadow-rose-900 flex items-center justify-center cursor-pointer"
    >
      {/* Анімовані кола при відтворенні */}
      {isPlaying && (
        <>
          <span className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-30" />
          <span className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-20" style={{ animationDelay: '0.5s' }} />
        </>
      )}
      {isPlaying
        ? <FaMusic className="text-lg md:text-xl relative z-10" />
        : <FaVolumeMute className="text-lg md:text-xl relative z-10" />
      }
    </motion.button>
  )
}