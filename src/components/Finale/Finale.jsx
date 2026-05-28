// src/components/Finale/Finale.jsx
import { useAudio } from '../../contexts/AudioContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import { FaHeart, FaRedo, FaPlay, FaPause, FaStar, FaTimes } from 'react-icons/fa'
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
  const DRIVE_FILE_ID = '19A1JORhSDsMZl3i_aAMv08HbFldoBGyr'
  const [isOpen, setIsOpen] = useState(false)
  const { isPlaying: musicPlaying, pause: pauseMusic, play: resumeMusic } = useAudio()
  const musicWasPlaying = useRef(false)

  const handleOpen = () => {
    musicWasPlaying.current = musicPlaying
    if (musicPlaying) pauseMusic()
    setIsOpen(true)
    // Блокуємо скрол сторінки
    document.body.style.overflow = 'hidden'
  }

  const handleClose = () => {
    setIsOpen(false)
    document.body.style.overflow = ''
    if (musicWasPlaying.current) resumeMusic()
  }

  // Закрити по Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* ── КАРТКА-ПОСТЕР ── */}
      <div className="max-w-lg mx-auto mb-12">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpen}
          className="relative cursor-pointer rounded-3xl overflow-hidden
            shadow-2xl shadow-rose-300 dark:shadow-rose-900 group"
        >
          {/* Градієнтний постер */}
          <div className="w-full aspect-video bg-gradient-to-br
            from-rose-400 via-fuchsia-500 to-violet-600
            flex items-center justify-center relative overflow-hidden"
          >
            {/* Декоративні кола на фоні */}
            <div className="absolute w-64 h-64 bg-white/10 rounded-full
              -top-16 -left-16 blur-2xl" />
            <div className="absolute w-48 h-48 bg-white/10 rounded-full
              -bottom-12 -right-12 blur-2xl" />

            {/* Емодзі та текст */}
            <div className="relative text-center text-white z-10 px-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-3"
              >
                🎬
              </motion.div>
              <p className="font-bold text-xl mb-1">Відео-привітання</p>
              <p className="text-white/70 text-sm">спеціально для тебе</p>
            </div>

            {/* Кнопка Play по центру */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-white/20
                backdrop-blur-sm border-2 border-white/50
                flex items-center justify-center
                group-hover:bg-white/30 group-hover:scale-110
                transition-all duration-300 shadow-2xl"
              >
                <FaPlay className="text-white text-3xl ml-1.5" />
              </div>
            </motion.div>

            {/* Overlay при hover */}
            <div className="absolute inset-0 bg-black/0
              group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Підпис під постером */}
          <div className="bg-white dark:bg-rose-950 px-5 py-3
            flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <FaHeart className="text-rose-500 text-sm animate-pulse" />
              <span className="text-rose-600 dark:text-rose-300
                text-sm font-medium"
              >
                Натисни, щоб переглянути 💕
              </span>
            </div>
            <span className="text-rose-400 text-xs">▶ Відтворити</span>
          </div>
        </motion.div>
      </div>

      {/* ── МОДАЛЬНЕ ВІКНО З IFRAME ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/95
              flex flex-col items-center justify-center p-4"
          >
            {/* Кнопка закрити */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={handleClose}
              className="absolute top-4 right-4 bg-white/10
                hover:bg-white/20 text-white rounded-full p-3
                transition-colors cursor-pointer z-10
                flex items-center gap-2 text-sm font-medium"
            >
              <FaTimes />
              Закрити
            </motion.button>

            {/* Заголовок */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-white/60 text-sm mb-4"
            >
              🎬 Відео-привітання
            </motion.p>

            {/* iframe — займає весь екран */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="w-full max-w-4xl rounded-2xl overflow-hidden
                shadow-2xl bg-black"
              style={{ aspectRatio: '16/9' }}
            >
              <iframe
                src={`https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Відео привітання"
              />
            </motion.div>

            {/* Підказка */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/40 text-xs mt-4"
            >
              Натисни Escape або кнопку, щоб закрити
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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