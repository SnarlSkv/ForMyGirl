// src/components/Gallery/Gallery.jsx
import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight, FaImages } from 'react-icons/fa'

// ─── ДАНІ ───────────────────────────────────────────────────────────────────
// Щоб додати справжні фото:
// 1. Поклади файли у src/assets/photos/
// 2. Зроби import photo1 from '../assets/photos/photo1.jpg' вгорі файлу
// 3. Заміни url: null на url: photo1
import photo1 from '../../assets/photos/15.jpg'
import photo2 from '../../assets/photos/16c.jpg'
import photo3 from '../../assets/photos/3.png'
import photo4 from '../../assets/photos/12.jpg'
import photo5 from '../../assets/photos/3.jpg'
import photo6 from '../../assets/photos/13.jpg'
import photo7 from '../../assets/photos/5.jpg'
import photo8 from '../../assets/photos/24.jpg'
import photo9 from '../../assets/photos/7.jpg'
import photo10 from '../../assets/photos/26.jpg'
import photo11 from '../../assets/photos/27.jpg'

const PHOTOS = [
  { id: 1, url: photo1, color: 'from-rose-300 to-pink-400',    caption: 'Хочу постійно отримувати такий подаруночок на Новий Рік 😄❤️',   span: 'col-span-2 row-span-2' },
  { id: 2, url: photo2, color: 'from-fuchsia-300 to-violet-400', caption: 'Коли сказали, що є запіканочка',     span: '' },
  { id: 3, url: photo3, color: 'from-amber-300 to-rose-300',   caption: 'Як я дивлюся на тебе коли ти вийшла з душику',       span: '' },
  { id: 4, url: photo3, color: 'from-violet-300 to-fuchsia-400', caption: 'Як я дивлюся на тебе постійно',    span: '' },
  { id: 5, url: photo4, color: 'from-pink-300 to-rose-400',    caption: 'Що бачить останній желейний ведмедик перед тим як його поділять навпіл',            span: '' },
  { id: 6, url: photo5, color: 'from-rose-400 to-fuchsia-400', caption: 'КЧААУУУ',   span: '' },
  { id: 7, url: photo6, color: 'from-sky-300 to-violet-400',   caption: 'Сарделька',        span: '' },
  { id: 8, url: photo7, color: 'from-emerald-300 to-rose-300', caption: 'Дві сардельки',       span: '' },
  { id: 9, url: photo8, color: 'from-emerald-300 to-rose-300', caption: 'Це так між іншим, просто случив за тобою )',       span: '' },
  { id: 10, url: photo9, color: 'from-emerald-300 to-rose-300', caption: '',       span: '' },
  { id: 11, url: photo10, color: 'from-emerald-300 to-rose-300', caption: 'Я не сплю.......',       span: '' },
  { id: 12, url: photo11, color: 'from-emerald-300 to-rose-300', caption: 'крута фотка',       span: '' },
  { id: 14, url: photo2, color: 'from-emerald-300 to-rose-300', caption: 'Ну все, тепер пішли до основного привітання',       span: '' },
  
  ]

// Початкові кути для кожної карти у стопці
const STACK_ROTATIONS = [0, -6, 5, -3, 7, -5]
// Зсуви x/y для кожної карти
const STACK_OFFSETS = [
  { x: 0,  y: 0  },
  { x: -8, y: 4  },
  { x: 6,  y: -3 },
  { x: -4, y: 6  },
  { x: 10, y: 2  },
  { x: -6, y: -5 },
]

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  const photo = photos[currentIndex]

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md
        flex items-center justify-center p-4"
    >
      {/* Лічильник */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2
        text-white/60 text-sm bg-white/10 px-3 py-1 rounded-full"
      >
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Закрити */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white
          bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all
          z-10 cursor-pointer"
      >
        <FaTimes className="text-xl" />
      </button>

      {/* Стрілка ліво */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-2 md:left-6 text-white/80 hover:text-white
          bg-white/10 hover:bg-white/20 rounded-full p-3 z-10 cursor-pointer
          transition-all"
      >
        <FaChevronLeft className="text-xl" />
      </button>

      {/* Фото */}
      <motion.div
        key={currentIndex}
        initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-xl w-full"
      >
        {/* Картка */}
        <div className="bg-white dark:bg-rose-950 rounded-3xl overflow-hidden shadow-2xl">
          {/* Фото або заглушка */}
          <div className={`w-full aspect-[4/3]
            bg-gradient-to-br ${photo.color} relative overflow-hidden`}
          >
            {photo.url
              ? (
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-contain bg-black/10"
                />
              )
              : (
                <div className="w-full h-full flex flex-col items-center
                  justify-center text-white/80 gap-3"
                >
                  <span className="text-6xl">📷</span>
                  <p className="text-lg font-medium">{photo.caption}</p>
                </div>
              )
            }
          </div>

          {/* Підписи */}
          <div className="p-4">
            <p className="text-rose-700 dark:text-rose-200 font-bold text-base mb-1">
              {photo.caption}
            </p>
            <p className="text-rose-400 dark:text-rose-400 text-sm italic">
              {photo.meme}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Стрілка право */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-2 md:right-6 text-white/80 hover:text-white
          bg-white/10 hover:bg-white/20 rounded-full p-3 z-10 cursor-pointer
          transition-all"
      >
        <FaChevronRight className="text-xl" />
      </button>

      {/* Мініатюри */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2
        flex gap-2 overflow-x-auto max-w-[90vw] px-2"
      >
        {photos.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={(e) => { e.stopPropagation() }}
            whileHover={{ scale: 1.1 }}
            className={`flex-shrink-0 w-8 h-8 rounded-lg
              bg-gradient-to-br ${p.color} transition-all cursor-pointer
              ${i === currentIndex
                ? 'ring-2 ring-white ring-offset-1 ring-offset-transparent scale-110'
                : 'opacity-50 hover:opacity-80'
              }`}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ─── СТОПКА КАРТ ──────────────────────────────────────────────────────────────
function CardStack({ onOpenLightbox }) {
  const [isHovered, setIsHovered] = useState(false)
  const [tappedOnce, setTappedOnce] = useState(false)

  // На мобільному перший тап розкриває стопку, другий — відкриває лайтбокс
  const handleClick = () => {
    if (window.innerWidth < 768) {
      if (!tappedOnce) { setTappedOnce(true); setIsHovered(true) }
      else { onOpenLightbox() }
    } else {
      onOpenLightbox()
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Стопка */}
      <div
        className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setTappedOnce(false) }}
        onClick={handleClick}
      >
        {PHOTOS.slice().reverse().map((photo, i) => {
          const realIndex = PHOTOS.length - 1 - i
          const rot = STACK_ROTATIONS[realIndex] ?? 0
          const off = STACK_OFFSETS[realIndex] ?? { x: 0, y: 0 }

          // При hover — карти розлітаються віялом
          const fanRot  = isHovered ? rot * 2.2 + (realIndex - 2.5) * 5 : rot
          const fanX    = isHovered ? off.x * 2.5 + (realIndex - 2.5) * 18 : off.x
          const fanY    = isHovered ? off.y * 2 - realIndex * 6 : off.y

          return (
            <motion.div
              key={photo.id}
              animate={{
                rotate: fanRot,
                x: fanX,
                y: fanY,
                scale: isHovered && realIndex === PHOTOS.length - 1 ? 1.04 : 1,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ zIndex: realIndex }}
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl
                bg-white dark:bg-rose-950"
            >
              {/* Фото або заглушка */}
              <div className={`w-full h-4/5 bg-gradient-to-br ${photo.color}
                flex items-center justify-center overflow-hidden`}
              >
                {photo.url
                  ? (
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                    />
                  )
                  : (
                    <span className="text-5xl select-none">📷</span>
                  )
                }
              </div>

             

              {/* Блиск на верхній карті при hover */}
              {realIndex === PHOTOS.length - 1 && isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br
                    from-white/20 to-transparent pointer-events-none rounded-3xl"
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Підказки */}
      <div className="text-center">
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-rose-500 dark:text-rose-400 text-sm font-medium"
        >
          {window.innerWidth < 768
            ? '👆 Натисни ще раз, щоб переглянути'
            : '🖱️ Клікни, щоб переглянути всі фото'
          }
        </motion.div>
      </div>

      {/* Кнопка */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenLightbox}
        className="inline-flex items-center gap-2
          bg-gradient-to-r from-rose-500 to-fuchsia-500
          hover:from-rose-600 hover:to-fuchsia-600
          text-white font-bold px-7 py-3 rounded-full
          shadow-lg shadow-rose-200 dark:shadow-rose-900
          transition-all cursor-pointer"
      >
        <FaImages className="text-lg" />
        Переглянути все
      </motion.button>
    </div>
  )
}

// ─── ГОЛОВНИЙ КОМПОНЕНТ ───────────────────────────────────────────────────────
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = useCallback(() => setLightboxIndex(0), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevPhoto = useCallback(() =>
    setLightboxIndex(i => (i - 1 + PHOTOS.length) % PHOTOS.length), [])
  const nextPhoto = useCallback(() =>
    setLightboxIndex(i => (i + 1) % PHOTOS.length), [])

  return (
    <section
      id="gallery"
      className="py-20 px-4 bg-gradient-to-b
        from-rose-50 to-fuchsia-50
        dark:from-rose-900/50 dark:to-fuchsia-950
        relative overflow-hidden"
    >
      {/* Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-bold
          text-fuchsia-600 dark:text-fuchsia-300 mb-4"
        >
          Трішечки прикольчиків
        </h2>
        <p className="text-fuchsia-500/70 dark:text-fuchsia-400/70 text-lg max-w-lg mx-auto">
          Куди ж без них
        </p>
        <div className="mt-4 w-20 h-1 bg-gradient-to-r
          from-fuchsia-400 to-rose-400 rounded-full mx-auto"
        />
      </motion.div>

      {/* Стопка карт по центру */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex justify-center"
      >
        <CardStack onOpenLightbox={openLightbox} />
      </motion.div>

      {/* Лайтбокс */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={PHOTOS}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  )
}