// src/components/Finale/Finale.jsx
import { useAudio } from '../../contexts/AudioContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import { FaHeart, FaRedo, FaPlay, FaPause, FaStar } from 'react-icons/fa'

// ─── ФІНАЛЬНИЙ ТЕКСТ ──────────────────────────────────────────────────────────
// Зміни на свій
const FINAL_WORDS = [
  { emoji: '☀️', text: 'Ти моє сонечко' },
  { emoji: '💯', text: 'Ти вся тисяча з ста' },
  { emoji: '🍫', text: 'Ти солодша за найбажаніший шоколад' },
  { emoji: '🥰', text: 'Ти неймовірна' },
  { emoji: '❤️', text: 'Ти — моє все' },
  { emoji: '🥳', text: 'Й ти заслуговуєш на все 😘' },
  
]

// ─── ВІДЕО-ПРИВІТАННЯ ─────────────────────────────────────────────────────────
// Поклади відео у public/video/greeting.mp4
// Або встав посилання на YouTube/Google Drive
function VideoGreeting() {
  const videoRef    = useRef(null)
  const wrapperRef  = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasVideo,  setHasVideo]  = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Беремо керування музикою з контексту
  const { isPlaying: musicPlaying, pause: pauseMusic, play: resumeMusic } = useAudio()
  // Запам'ятовуємо чи грала музика ДО запуску відео
  const musicWasPlaying = useRef(false)

  // Слухаємо події повноекранного режиму
  useEffect(() => {
    const onFsChange = () => {
      const inFs = !!(
        document.fullscreenElement       ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement
      )
      setIsFullscreen(inFs)

      // Якщо вийшли з повноекранного — ставимо відео на паузу
      if (!inFs && videoRef.current) {
        videoRef.current.pause()
        setIsPlaying(false)
        // Відновлюємо музику якщо вона грала до цього
        if (musicWasPlaying.current) resumeMusic()
      }
    }

    document.addEventListener('fullscreenchange',       onFsChange)
    document.addEventListener('webkitfullscreenchange', onFsChange)
    document.addEventListener('mozfullscreenchange',    onFsChange)
    return () => {
      document.removeEventListener('fullscreenchange',       onFsChange)
      document.removeEventListener('webkitfullscreenchange', onFsChange)
      document.removeEventListener('mozfullscreenchange',    onFsChange)
    }
  }, [resumeMusic])

  // Відкрити на весь екран + зупинити музику
  const enterFullscreen = async (element) => {
    try {
      if (element.requestFullscreen)            await element.requestFullscreen()
      else if (element.webkitRequestFullscreen) await element.webkitRequestFullscreen()
      else if (element.mozRequestFullScreen)    await element.mozRequestFullScreen()
    } catch (err) {
      // На деяких iOS браузерах requestFullscreen недоступний —
      // відео все одно відтвориться звичайно
      console.warn('Fullscreen недоступний:', err)
    }
  }

  const handlePlay = async () => {
    const video = videoRef.current
    if (!video) return

    // Запам'ятовуємо стан музики
    musicWasPlaying.current = musicPlaying
    // Вимикаємо музику
    if (musicPlaying) pauseMusic()

    // Відкриваємо відео на весь екран
    // На мобільному iOS — відкриваємо сам відео-елемент
    // На десктопі — обгортку (для кастомних контролів)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const fsTarget = isMobile ? video : (wrapperRef.current ?? video)

    await enterFullscreen(fsTarget)

    // Запускаємо відео
    video.play().catch(() => {})
    setIsPlaying(true)
  }

  const handlePause = () => {
    videoRef.current?.pause()
    setIsPlaying(false)
    if (musicWasPlaying.current) resumeMusic()
  }

  const handleEnded = () => {
    setIsPlaying(false)
    // Виходимо з повноекранного режиму
    if (document.exitFullscreen)            document.exitFullscreen()
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
    // Відновлюємо музику
    if (musicWasPlaying.current) resumeMusic()
  }

  return (
    <div className="max-w-lg mx-auto mb-12">
      <div
        ref={wrapperRef}
        className="relative rounded-3xl overflow-hidden shadow-2xl
          shadow-rose-300 dark:shadow-rose-900
          bg-gradient-to-br from-rose-200 to-fuchsia-200
          dark:from-rose-800 dark:to-fuchsia-800"
      >
        {hasVideo ? (
          <>
            <video
              ref={videoRef}
              src="/video/greeting.mp4"
              className="w-full aspect-video object-cover"
              playsInline          // важливо для iOS — не автоповноекран при завантаженні
              preload="metadata"   // завантажуємо тільки метадані одразу
              onEnded={handleEnded}
              onError={() => setHasVideo(false)}
            />

            {/* Overlay — кнопка Play поверх відео */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handlePlay}
                  className="absolute inset-0 flex flex-col items-center
                    justify-center cursor-pointer gap-3 group
                    bg-black/20 hover:bg-black/30 transition-colors"
                >
                  {/* Кнопка */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/30 backdrop-blur-sm rounded-full p-5
                      group-hover:bg-white/40 transition-colors shadow-xl"
                  >
                    <FaPlay className="text-white text-3xl ml-1" />
                  </motion.div>

                  {/* Підказки під кнопкою */}
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm drop-shadow">
                      Тицькай сюди)
                    </p>
                    <p className="text-white/70 text-xs mt-0.5 drop-shadow">
                      🎬 Відкриється на весь екран
                      {musicPlaying && ' · 🎵 Музика призупиниться'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Кнопка паузи (видима тільки під час відтворення, не в fullscreen) */}
            <AnimatePresence>
              {isPlaying && !isFullscreen && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handlePause}
                  className="absolute bottom-3 right-3 bg-black/50
                    backdrop-blur-sm text-white rounded-full p-2.5
                    cursor-pointer hover:bg-black/70 transition-colors"
                >
                  <FaPause className="text-sm" />
                </motion.button>
              )}
            </AnimatePresence>
          </>
        ) : (
          // Заглушка якщо відео відсутнє
          <div className="aspect-video flex flex-col items-center
            justify-center gap-3 text-white/80 p-6"
          >
            <span className="text-6xl">🎬</span>
            <p className="font-medium text-center text-sm">
              Поклади відео у{' '}
              <code className="bg-white/20 px-2 py-0.5 rounded">
                public/video/greeting.mp4
              </code>
            </p>
          </div>
        )}
      </div>

      <p className="text-center text-rose-400 dark:text-rose-500 text-sm mt-3">
        🎬 Відео-привітання спеціально для тебе
      </p>
    </div>
  )
}

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────
export default function Finale() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [confettiPieces, setConfettiPieces] = useState(250)
  const [activeWord, setActiveWord] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const sectionRef = useRef(null)

  // Отримуємо розмір вікна для конфеті
  useEffect(() => {
    const update = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Автозапуск конфеті коли секція входить у viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          setShowConfetti(true)
          // Поступово зменшуємо кількість конфеті і зупиняємо
          setTimeout(() => setConfettiPieces(0), 4000)
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasStarted])

  // Карусель фінальних слів
  useEffect(() => {
    if (!hasStarted) return
    const interval = setInterval(() => {
      setActiveWord(i => (i + 1) % FINAL_WORDS.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [hasStarted])

  const restartSite = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Нове конфеті при рестарті
    setTimeout(() => {
      setShowConfetti(true)
      setConfettiPieces(200)
      setTimeout(() => setConfettiPieces(0), 3000)
    }, 1000)
  }

  const launchConfetti = () => {
    setShowConfetti(true)
    setConfettiPieces(300)
    setTimeout(() => setConfettiPieces(0), 4000)
  }

  return (
    <section
      ref={sectionRef}
      id="finale"
      className="py-20 px-4 bg-gradient-to-b from-pink-50 via-rose-50 to-fuchsia-100 dark:from-pink-950 dark:via-rose-950 dark:to-fuchsia-900 relative overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Конфеті */}
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={confettiPieces}
          recycle={false}
          colors={['#f43f5e', '#ec4899', '#a855f7', '#8b5cf6', '#fbbf24', '#34d399']}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 999, pointerEvents: 'none' }}
        />
      )}

      {/* Зірки на фоні */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-200 dark:text-rose-800 pointer-events-none select-none"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            fontSize: `${Math.random() * 16 + 8}px`,
          }}
          animate={{ rotate: 360, scale: [1, 1.3, 1] }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-rose-600 dark:text-rose-300 mb-4 leading-tight"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎂 З Днем Народження!
        </motion.h2>
        <p className="text-fuchsia-600 dark:text-fuchsia-300 text-xl md:text-2xl font-medium">
          Нехай цей день буде чарівним ✨
        </p>
      </motion.div>

      {/* Відео */}
      <VideoGreeting />

      {/* Карусель фінальних слів */}
      <div className="text-center mb-12 h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeWord}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="text-5xl mb-2">{FINAL_WORDS[activeWord].emoji}</div>
            <p className="text-2xl md:text-3xl font-bold text-rose-600 dark:text-rose-300">
              {FINAL_WORDS[activeWord].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Велике серце */}
      <motion.div
        className="flex justify-center mb-10"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="relative">
          <FaHeart className="text-rose-500 dark:text-rose-400 text-7xl md:text-8xl drop-shadow-2xl" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-white text-sm font-bold">∞</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Кнопки */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Кнопка конфеті */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={launchConfetti}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-white font-bold px-7 py-3.5 rounded-full shadow-lg transition-all cursor-pointer"
        >
          <FaStar className="animate-spin" style={{ animationDuration: '3s' }} />
          Ще конфеті! 🎊
        </motion.button>

        {/* Кнопка перезапустити */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={restartSite}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 to-rose-500 hover:from-fuchsia-600 hover:to-rose-600 text-white font-bold px-7 py-3.5 rounded-full shadow-lg transition-all cursor-pointer"
        >
          <FaRedo />
          Переглянути знову
        </motion.button>
      </div>

      {/* Підпис внизу */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="text-center mt-12 text-rose-400/60 dark:text-rose-500/60 text-sm"
      >
        Зроблено з ❤️ спеціально для тебе
      </motion.p>
    </section>
  )
}