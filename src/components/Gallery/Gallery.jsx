// src/components/Gallery/Gallery.jsx
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaHeart } from 'react-icons/fa'

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

const PHOTOS = [
  { id: 1, url: photo1, color: 'from-rose-300 to-pink-400',    caption: 'Хочу постійно отримувати такий подаруночок на Новий Рік 😄❤️',   span: 'col-span-2 row-span-2' },
  { id: 2, url: photo2, color: 'from-fuchsia-300 to-violet-400', caption: 'Коли сказали, що є запіканочка',     span: '' },
  { id: 3, url: photo3, color: 'from-amber-300 to-rose-300',   caption: 'Як я дивлюся на тебе коли ти вийшла з душику',       span: '' },
  { id: 4, url: photo3, color: 'from-violet-300 to-fuchsia-400', caption: 'Як я дивлюся на тебе постійно',    span: '' },
  { id: 5, url: photo4, color: 'from-pink-300 to-rose-400',    caption: 'Що бачить останній желейний ведмедик перед тим як його поділять навпіл',            span: '' },
  { id: 6, url: photo5, color: 'from-rose-400 to-fuchsia-400', caption: 'КЧААУУУ',   span: 'col-span-2' },
  { id: 7, url: photo6, color: 'from-sky-300 to-violet-400',   caption: 'Сарделька',        span: '' },
  { id: 8, url: photo7, color: 'from-emerald-300 to-rose-300', caption: 'Дві сардельки',       span: '' },
  { id: 9, url: photo2, color: 'from-emerald-300 to-rose-300', caption: 'Ну все, тепер пішли до основного привітання',       span: '' },
  ]

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  const photo = photos[currentIndex]

  // Клавіатурна навігація
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  // Блокуємо скрол сторінки поки лайтбокс відкритий
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
    >
      {/* Кнопка закрити */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all z-10 cursor-pointer"
      >
        <FaTimes className="text-xl" />
      </button>

      {/* Лічильник */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Стрілка ліво */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-2 md:left-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all cursor-pointer z-10"
      >
        <FaChevronLeft className="text-xl" />
      </button>

      {/* Фото */}
      <motion.div
        key={currentIndex}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full"
      >
        <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${photo.color} flex items-center justify-center shadow-2xl overflow-hidden`}>
          {photo.url
            ? <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
            : (
              <div className="text-center text-white/80 p-8">
                <FaHeart className="text-5xl mx-auto mb-4 animate-pulse" />
                <p className="text-xl font-medium">{photo.caption}</p>
                <p className="text-sm mt-2 opacity-60">Фото #{photo.id}</p>
              </div>
            )
          }
        </div>
        <p className="text-center text-white/80 mt-4 text-lg font-medium">
          {photo.caption}
        </p>
      </motion.div>

      {/* Стрілка право */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-2 md:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all cursor-pointer z-10"
      >
        <FaChevronRight className="text-xl" />
      </button>

      {/* Мініатюри знизу */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 overflow-x-auto max-w-[90vw] px-2 pb-1">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={(e) => { e.stopPropagation(); /* навігація через пропс не потрібна, просто виклик onPrev/onNext */ }}
            className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} transition-all cursor-pointer
              ${i === currentIndex ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-80'}`}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ─── КАРТОЧКА ФОТО ───────────────────────────────────────────────────────────
function PhotoCard({ photo, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`${photo.span} relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300`}
    >
      {/* Фото або заглушка */}
      <div className={`absolute inset-0 bg-gradient-to-br ${photo.color} transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
        {photo.url && (
          <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
        )}
      </div>

      {/* Overlay при hover */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2"
      >
        <FaExpand className="text-white text-2xl" />
        <p className="text-white text-sm font-medium text-center px-3">
          {photo.caption}
        </p>
      </motion.div>

      {/* Підпис внизу (без hover — для мобільних) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <p className="text-white text-xs font-medium truncate">{photo.caption}</p>
      </div>
    </motion.div>
  )
}

// ─── ГОЛОВНИЙ КОМПОНЕНТ ──────────────────────────────────────────────────────
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const prevPhoto = useCallback(() => {
    setLightboxIndex(i => (i - 1 + PHOTOS.length) % PHOTOS.length)
  }, [])

  const nextPhoto = useCallback(() => {
    setLightboxIndex(i => (i + 1) % PHOTOS.length)
  }, [])

  return (
    <section
      id="gallery"
      className="py-20 px-4 bg-gradient-to-b from-rose-50 to-fuchsia-50 dark:from-rose-900/50 dark:to-fuchsia-950 relative"
    >
      {/* Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-fuchsia-600 dark:text-fuchsia-300 mb-4">
          📸 Трішечки приколів для підняття настрою
        </h2>
        <p className="text-fuchsia-500/70 dark:text-fuchsia-400/70 text-lg max-w-lg mx-auto">
          
        </p>
        <div className="mt-4 w-20 h-1 bg-gradient-to-r from-fuchsia-400 to-rose-400 rounded-full mx-auto" />
      </motion.div>

      {/* Сітка */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[180px] gap-3 md:gap-4">
        {PHOTOS.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            index={index}
            onClick={() => openLightbox(index)}
          />
        ))}
      </div>

      {/* Підказка */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8 text-fuchsia-400/60 dark:text-fuchsia-500/60 text-sm"
      >
        Натисни на фото, щоб відкрити 🔍
      </motion.p>

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