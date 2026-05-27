// src/components/Hero/Hero.jsx
import { motion } from 'framer-motion'
import { FaHeart, FaGift } from 'react-icons/fa'

// Анімаційні варіанти — описують як елемент з'являється
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: 'easeOut' },
  }),
}

export default function Hero({ onOpen }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      
      {/* Градієнтний фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-fuchsia-100 dark:from-rose-950 dark:via-pink-950 dark:to-fuchsia-950" />

      {/* Декоративні розмиті кола — дають глибину */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-700 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-fuchsia-300 dark:bg-fuchsia-700 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Основний контент */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">

        {/* Іконка серця зверху */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex justify-center mb-6"
        >
          <FaHeart className="text-rose-500 text-5xl md:text-6xl drop-shadow-lg animate-bounce" />
        </motion.div>

        {/* Головний заголовок */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-rose-600 dark:text-rose-300 leading-tight mb-4"
        >
          З Днем{' '}
          <span className="text-fuchsia-600 dark:text-fuchsia-300">
            Народження
          </span>
          ! 🎂
        </motion.h1>

        {/* Підзаголовок */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-lg md:text-2xl text-rose-500 dark:text-rose-400 mb-2 font-medium"
        >
          Для найкращої дівчини у світі
        </motion.p>

        {/* Ім'я — ЗМІНИ на ім'я своєї дівчини */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="text-2xl md:text-4xl font-bold text-fuchsia-700 dark:text-fuchsia-300 mb-10 italic"
        >
          ✨ Нікочки ✨
        </motion.p>

        {/* Кнопка */}
        <motion.button
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-fuchsia-600 hover:from-rose-600 hover:to-fuchsia-700 text-white font-bold text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-full shadow-2xl shadow-rose-300 dark:shadow-rose-900 transition-all duration-300 cursor-pointer"
        >
          <FaGift className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
          Тиць сюди
          <FaHeart className="text-xl group-hover:scale-125 transition-transform duration-300" />
        </motion.button>

        {/* Підказка внизу */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.9}
          className="mt-8 text-sm text-rose-400 dark:text-rose-500 animate-pulse"
        >
          Не забудь увімкнути музику 💕 але обережно по гучності 🙈
        </motion.p>
      </div>
    </section>
  )
}