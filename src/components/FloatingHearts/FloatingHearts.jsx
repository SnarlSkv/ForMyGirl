// src/components/FloatingHearts/FloatingHearts.jsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Всі можливі символи-серця
const HEART_SYMBOLS = ['❤️', '🩷', '💕', '💗', '💖', '💝', '🌸', '✨']

// Генерує одне випадкове серце з унікальними параметрами
function createHeart(id) {
  return {
    id,
    symbol: HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)],
    x: Math.random() * 100,           // позиція по горизонталі (%)
    size: Math.random() * 20 + 14,    // розмір (14px–34px)
    duration: Math.random() * 8 + 7,  // тривалість підйому (7–15 сек)
    delay: Math.random() * 3,         // затримка старту (0–3 сек)
    opacity: Math.random() * 0.4 + 0.15, // прозорість (0.15–0.55)
    drift: (Math.random() - 0.5) * 120,  // горизонтальний дрейф (±60px)
  }
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState(() =>
    // Створюємо 12 сердець одразу при монтуванні
    Array.from({ length: 12 }, (_, i) => createHeart(i))
  )
  const [nextId, setNextId] = useState(12)

  useEffect(() => {
    // Кожні 2.5 секунди додаємо нове серце
    const interval = setInterval(() => {
      setNextId(prev => {
        const id = prev + 1
        setHearts(h => {
          // Тримаємо максимум 18 сердець, щоб не перевантажувати
          const updated = [...h.slice(-17), createHeart(id)]
          return updated
        })
        return id
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    // pointer-events-none — серця не перехоплюють кліки
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.span
            key={heart.id}
            initial={{
              y: '105vh',          // стартує нижче екрану
              x: `${heart.x}vw`,  // випадкова горизонтальна позиція
              opacity: 0,
              scale: 0.3,
            }}
            animate={{
              y: '-10vh',          // піднімається вище екрану
              x: `calc(${heart.x}vw + ${heart.drift}px)`, // плавний дрейф
              opacity: [0, heart.opacity, heart.opacity, 0],
              scale: [0.3, 1, 1, 0.5],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: 'easeInOut',
            }}
            onAnimationComplete={() => {
              // Видаляємо серце після завершення анімації
              setHearts(h => h.filter(hh => hh.id !== heart.id))
            }}
            style={{ fontSize: heart.size }}
            className="absolute select-none"
          >
            {heart.symbol}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}