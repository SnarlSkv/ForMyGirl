// src/components/Navbar/Navbar.jsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'

// Секції сайту — id має співпадати з id секцій у App.jsx
const NAV_ITEMS = [
  { id: 'hero',    label: '🏠 Головна' },
  { id: 'timeline', label: '📖 Спогади' },
  { id: 'message', label: '💌 Послання' },
  { id: 'gallery', label: '📸 Галерея' },
  // { id: 'memes',   label: '😄 Меми' },
  // { id: 'games',   label: '🎮 Ігри' },
  { id: 'finale',  label: '🎉 Фінал' },
]

export default function Navbar({ isDark, onToggleTheme }) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  // Ховаємо навбар при скролі вниз, показуємо при скролі вгору
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsVisible(currentY < lastScrollY || currentY < 80)
      setLastScrollY(currentY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Відстежуємо яка секція зараз видима (для підсвічування пункту меню)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 } // секція вважається активною коли видно 40%
    )
    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Плавний скрол до секції
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Десктопний / мобільний навбар */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
          >
            <div className="max-w-5xl mx-auto bg-white/70 dark:bg-rose-950/70 backdrop-blur-md rounded-2xl shadow-lg shadow-rose-200/50 dark:shadow-rose-900/50 px-4 py-2 flex items-center justify-between border border-rose-100 dark:border-rose-800">
              
              {/* Логотип */}
              <button
                onClick={() => scrollTo('hero')}
                className="flex items-center gap-2 text-rose-600 dark:text-rose-300 font-bold text-lg hover:scale-105 transition-transform cursor-pointer"
              >
                <FaHeart className="text-rose-500 animate-pulse" />
                <span className="hidden sm:inline">З Днем Народження!</span>
                <span className="sm:hidden">ДН 🎂</span>
              </button>

              {/* Десктопне меню */}
              <ul className="hidden lg:flex items-center gap-1">
                {NAV_ITEMS.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                        ${activeSection === item.id
                          ? 'bg-rose-500 text-white shadow-md shadow-rose-300'
                          : 'text-rose-600 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-800'
                        }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Права частина: тема + бургер */}
              <div className="flex items-center gap-2">
                {/* Перемикач теми */}
                <button
                  onClick={onToggleTheme}
                  className="p-2 rounded-xl bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 hover:scale-110 transition-transform cursor-pointer"
                  title={isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
                >
                  {isDark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                </button>

                {/* Бургер — тільки на мобільному */}
                <button
                  onClick={() => setIsMenuOpen(prev => !prev)}
                  className="lg:hidden p-2 rounded-xl bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 hover:scale-110 transition-transform cursor-pointer"
                >
                  {isMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
                </button>
              </div>
            </div>

            {/* Мобільне меню (розкривається) */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-5xl mx-auto mt-2 bg-white/90 dark:bg-rose-950/90 backdrop-blur-md rounded-2xl shadow-lg border border-rose-100 dark:border-rose-800 p-3"
                >
                  <ul className="grid grid-cols-2 gap-2">
                    {NAV_ITEMS.map(item => (
                      <li key={item.id}>
                        <button
                          onClick={() => scrollTo(item.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer
                            ${activeSection === item.id
                              ? 'bg-rose-500 text-white'
                              : 'text-rose-600 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-800'
                            }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}