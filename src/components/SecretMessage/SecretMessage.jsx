// src/components/SecretMessage/SecretMessage.jsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLock, FaLockOpen, FaHeart, FaEnvelopeOpenText } from 'react-icons/fa'

// ─── ТЕКСТ ПОСЛАННЯ ───────────────────────────────────────────────────────────
// Заміни на свій текст. \n — новий рядок
const SECRET_LINES = [
  'Це лише малюсінька частинка всіх тих ',
  'неймовірних моментів які зробили мене щасливим 💕',
  '',
  'Тож у цей чарівний день й всі наступні',
  'дозволь не тільки побажати тобі такої ж радості,',
  'яку ти радуєш мене кожного дня! 😊',
  'А й зробити тебе щасливою',
  '',
  'Перш за все хочу, щоб ти завжди було в гарному настрої',
  'Тож до вашої уваги трішечки мемасиків які',
  'сподіваюсь піднімуть тобі настрій ще більше!',
  '',
  'А далі тебе чекатиме відео привітання 😋',
  '',
  '',
  '❤️ Як завжди люблю тебе! ❤️',
  '',
  'З Днем Народження, моя зіронька! 🌟',
]

// ─── ХУК ЕФЕКТУ ДРУКАРСЬКОЇ МАШИНКИ ─────────────────────────────────────────
function useTypewriter(lines, isActive, speed = 45) {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (!isActive || isDone) return

    // Якщо всі рядки надруковані
    if (currentLine >= lines.length) {
      setIsDone(true)
      return
    }

    const line = lines[currentLine]

    // Порожній рядок — додаємо одразу без затримки
    if (line === '') {
      setDisplayedLines(prev => [...prev, ''])
      setCurrentLine(l => l + 1)
      setCurrentChar(0)
      return
    }

    // Якщо рядок надруковано повністю — переходимо до наступного
    if (currentChar >= line.length) {
      const timer = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, 300) // пауза між рядками
      return () => clearTimeout(timer)
    }

    // Друкуємо наступний символ
    const timer = setTimeout(() => {
      setDisplayedLines(prev => {
        const updated = [...prev]
        updated[currentLine] = (updated[currentLine] || '') + line[currentChar]
        return updated
      })
      setCurrentChar(c => c + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [isActive, currentLine, currentChar, lines, isDone, speed])

  const reset = () => {
    setDisplayedLines([])
    setCurrentLine(0)
    setCurrentChar(0)
    setIsDone(false)
  }

  return { displayedLines, isDone, reset }
}

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────
export default function SecretMessage() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const containerRef = useRef(null)

  const { displayedLines, isDone, reset } = useTypewriter(
    SECRET_LINES,
    isTyping,
    40
  )

  // Після розблокування — починаємо друкувати
  const unlock = () => {
    setIsUnlocked(true)
    setTimeout(() => setIsTyping(true), 800)
  }

  // Авто-скрол вниз під час друку
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayedLines])

  const handleReset = () => {
    setIsUnlocked(false)
    setIsTyping(false)
    reset()
  }

  return (
    <section
      id="message"
      className="py-20 px-4 bg-gradient-to-b from-fuchsia-50 via-rose-50 to-pink-50 dark:from-fuchsia-950 dark:via-rose-950 dark:to-pink-950 relative overflow-hidden"
    >
      {/* Декоративні елементи фону */}
      <div className="absolute top-10 left-5 text-6xl opacity-10 rotate-12 select-none pointer-events-none">💌</div>
      <div className="absolute bottom-10 right-5 text-6xl opacity-10 -rotate-12 select-none pointer-events-none">💌</div>

      {/* Заголовок */}
            <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">

          {/* ── СТАН: ЗАМКНЕНО ── */}
          {!isUnlocked && (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Конверт */}
              <div className="relative inline-block mb-8">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-[120px] md:text-[160px] select-none leading-none filter drop-shadow-2xl"
                >
                  💕💕💕
                </motion.div>
                {/* Пульсуюче коло */}
                <div className="absolute inset-0 rounded-full bg-rose-300 dark:bg-rose-600 blur-3xl opacity-20 animate-pulse" />
              </div>

              <p className="text-rose-600 dark:text-rose-300 text-lg mb-2 font-medium">
                
              </p>
              <p className="text-rose-400 dark:text-rose-500 text-sm mb-8">
                
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={unlock}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-fuchsia-500 to-rose-500 hover:from-fuchsia-600 hover:to-rose-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-xl shadow-fuchsia-200 dark:shadow-fuchsia-900 transition-all cursor-pointer"
              >
                <FaLock className="group-hover:rotate-12 transition-transform" />
                Продовжуємо?))))
                <FaEnvelopeOpenText className="group-hover:scale-110 transition-transform" />
              </motion.button>
            </motion.div>
          )}

          {/* ── СТАН: ВІДКРИТО / ДРУКУЄТЬСЯ ── */}
          {isUnlocked && (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Іконка замка зверху */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-100 dark:bg-green-900/40 rounded-full p-3"
                >
                  <FaLockOpen className="text-green-500 text-2xl" />
                </motion.div>
              </div>

              {/* Папір листа */}
              <div className="relative">
                {/* Тінь паперу */}
                <div className="absolute inset-2 bg-rose-200 dark:bg-rose-800 rounded-2xl blur-sm opacity-30 translate-y-2" />

                <div className="relative bg-white dark:bg-rose-950/80 rounded-2xl shadow-2xl border border-rose-100 dark:border-rose-800 overflow-hidden">

                  {/* Заголовок листа */}
                  <div className="bg-gradient-to-r from-fuchsia-500 to-rose-500 px-6 py-4 flex items-center gap-3">
                    <FaHeart className="text-white text-xl animate-pulse" />
                    <span className="text-white font-bold text-lg">О моя Джул'єта з Днем Народження тебе ❤️</span>
                    <FaHeart className="text-white text-xl animate-pulse ml-auto" />
                  </div>

                  {/* Лінований фон */}
                  <div
                    ref={containerRef}
                    className="relative px-6 md:px-10 py-8 max-h-[400px] overflow-y-auto"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #fce7f350 31px, #fce7f350 32px)',
                      backgroundSize: '100% 32px',
                      backgroundPositionY: '8px',
                    }}
                  >
                    <div className="font-mono text-base md:text-lg text-rose-800 dark:text-rose-200 leading-8 min-h-[200px]">
                      {displayedLines.map((line, i) => (
                        <p key={i} className={line === '' ? 'h-4' : ''}>
                          {line}
                          {/* Курсор мигає на поточному рядку */}
                          {i === displayedLines.length - 1 && !isDone && (
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity }}
                              className="inline-block w-0.5 h-5 bg-rose-500 ml-0.5 align-middle"
                            />
                          )}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Підпис внизу */}
                  <AnimatePresence>
                    {isDone && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="px-6 md:px-10 pb-8 pt-2 text-right"
                      >
                        <p className="text-rose-400 dark:text-rose-500 text-sm italic">
                          — Твій найвідданіший фанат 💕
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Кнопка перечитати */}
              <AnimatePresence>
                {isDone && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-6"
                  >
                    <button
                      onClick={handleReset}
                      className="text-fuchsia-500 hover:text-fuchsia-600 font-medium text-sm underline underline-offset-2 cursor-pointer transition-colors"
                    >
                      💌 Перечитати знову
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}