// src/components/Timeline/Timeline.jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaHeart, FaCamera, FaStar, FaMusic, FaCoffee, FaMap } from 'react-icons/fa'

// ─── ДАНІ ───────────────────────────────────────────────────────────────────
// Заміни тексти, дати та іконки на свої спогади
// photo: null → показує кольоровий блок-заглушку
// Щоб додати фото: поклади файл у src/assets/photos/ і напиши import зверху

import photo1 from '../../assets/photos/17.jpg'
import photo2 from '../../assets/photos/18.jpg'
import photo3 from '../../assets/photos/1.png'
import photo4 from '../../assets/photos/1.jpg'
import photo5 from '../../assets/photos/20.jpg'
import photo6 from '../../assets/photos/4.png'
import photo7 from '../../assets/photos/21.jpg'
import photo8 from '../../assets/photos/22.jpg'
import photo9 from '../../assets/photos/25.jpg'
import photo10 from '../../assets/photos/19.jpg'

const MEMORIES = [
  {
    id: 1,
    date: 'З чого все почалося',
    icon: FaStar,
    color: 'from-rose-400 to-pink-500',
    bg: 'bg-rose-50 dark:bg-rose-900/30',
    border: 'border-rose-200 dark:border-rose-700',
    title: 'День нашого знайомства ✨',
    text: 'Ти почала мені подобатись вже з перших повідомлень. Твої смаки, твої захоплення були такими близькими мені, що я ловив себе на думці чи справді все так. А почувши твій голос, я взагалі розтанув) Потім початок нашого спільного перегляду Мао Мао, серії йшли неймовірно швидко й з кожною серію я все більше хотів подивитися щось з тобою вже офлайн.', 
    photo: photo1,
    photoColor: 'from-rose-300 to-pink-400',
  },
  {
    id: 2,    
    date: 'Перша прогулянка',
    icon: FaMap,
    color: 'from-fuchsia-400 to-purple-500',
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/30',
    border: 'border-fuchsia-200 dark:border-fuchsia-700',
    title: 'Наша перша прогулянка 🚶‍♂️🚶‍♀️',
    text: 'Пам\'ятаю як я бігав очима як тільки вийшов з автобуса шукавши тебе. Й вже як побачив поки йшов на пару секунд забув й як говорити XD Ти виявилась ще гарнішою ніж на фото, а я переймався за свою зачіску й як виявилося не я один) День тоді пройшов чудово аж дивно, що я тоді ніяк не начудив)',
    photo: photo2,
    photoColor: 'from-fuchsia-300 to-purple-400',
  },
  {
    id: 3,
    date: 'День коли ти приїхала в Полтаву',
    icon: FaCoffee,
    color: 'from-amber-400 to-rose-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-700',
    title: 'День, який не точно забуду',
    text: 'Незважаючи на шум генераторів та незовсім сприятливу погоду з тобою було спокійно та затишно. Твої обійми як й того дня такіж ніжні й бажані, досі пам\'ятаю який я щасливий йшов додому після того дня. Але й пам\'ятаю який я був затупок не поцілувавши тебе ще тоді',
    photo: photo3,
    photoColor: 'from-amber-300 to-rose-300',
  },
  {
    id: 4,
    date: 'Прогуляночки разом',
    icon: FaMusic,
    color: 'from-violet-400 to-fuchsia-500',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    border: 'border-violet-200 dark:border-violet-700',
    title: 'Звісно ж прогуляночки',
    text: 'Прогуляночки вдвох та з Норою, сміючись, розмовляючи про все що завгодно або ж просто в тиші, бо час з тобою найкращий. Завжди мріяв про таку приємну рутину з кимось особливим)',
    photo: photo4,
    photoColor: 'from-violet-300 to-fuchsia-400',
  },
  {
    id: 5,
    date: 'Новий рік',
    icon: FaHeart,
    color: 'from-rose-500 to-red-500',
    bg: 'bg-rose-50 dark:bg-rose-900/30',
    border: 'border-rose-200 dark:border-rose-700',
    title: 'Перше наше свято вдвох!',
    text: 'Той Новий рік, звісно, був не таким довгим, як би мені того хотілося, але він був теплим й затишним. Особливо мені сподобалась частина, де ти розпаковувала подаруночки, ти була така щаслива й мила, примірюючи кожну річ. Саме тоді, напевно, я й закріпив своє бажання зробити якнайбільше, щоб бачити тебе такою радічною якомога частіше.',
    photo: photo5,
    photoColor: 'from-rose-400 to-red-400',
  },
  {
    id: 6,
    date: 'Ігри разом',
    icon: FaHeart,
    color: 'from-rose-500 to-red-500',
    bg: 'bg-rose-50 dark:bg-rose-900/30',
    border: 'border-rose-200 dark:border-rose-700',
    title: 'Обожнюю ігри, особливо з тобою!)',
    text: 'Хоча дивлячись на історію наших ігор доречніше було б написати, що я обожнюю програвати XD Але це не так! Я обов\'язково виграю наступного разу!)',
    photo: photo6,
    photoColor: 'from-rose-400 to-red-400',
  },
  {
    id: 7,
    date: 'Ооо, а це, що за смакота?)',
    icon: FaStar,
    color: 'from-rose-400 to-pink-500',
    bg: 'bg-rose-50 dark:bg-rose-900/30',
    border: 'border-rose-200 dark:border-rose-700',
    title: 'Кулінарні шедеври ✨',
    text: 'Хоча я ще здебільшого лиш асистую тобі, проте запевняю, що з часом теж були радувати тебе своїми кулінарними шедеврами й я зараз не тільки про шашлик XD',
    photo: photo7,
    photoColor: 'from-rose-300 to-pink-400',
  },
  {
    id: 8,    
    date: 'Одна з найприкольніших ночей',
    icon: FaMap,
    color: 'from-fuchsia-400 to-purple-500',
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/30',
    border: 'border-fuchsia-200 dark:border-fuchsia-700',
    title: 'Прикрашання пасочок',
    text: 'Той день був таким затишним й веселим, особливо коли вимкнули світло й довелося прикрашати пасочки при світлі ліхтарика. Загалом все було так мило, що пасочки розчулились й потекли трошки інакших теорій не маю))',
    photo: photo8,
    photoColor: 'from-fuchsia-300 to-purple-400',
  },
  {
    id: 9,
    date: '8 чудо світу - це ти ❤️',
    icon: FaMusic,
    color: 'from-violet-400 to-fuchsia-500',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    border: 'border-violet-200 dark:border-violet-700',
    title: 'Обожнюю тебе',
    text: 'Й хочу, щоб ти так само обожнювала себе!) Ти неймовірна, талановита, красива, розумна, весела, добра й ще багато інших класних якостей, які я не втомлююсь помічати в тобі кожного дня.',
    photo: photo9,
    photoColor: 'from-violet-300 to-fuchsia-400',
  },
  {
    id: 10,
    date: 'І ось сьогодні — твій день народження! 🎂',
    icon: FaHeart,
    color: 'from-rose-500 to-red-500',
    bg: 'bg-rose-50 dark:bg-rose-900/30',
    border: 'border-rose-200 dark:border-rose-700',
    title: 'Вітаю тебе сонечко! 🎉',
    text: 'Нехай твоя посмішка й надалі наче промінчики щастя освітлює тобі життя! Вітаю тебе з цим чудовим днем, пам\'ятай ти особлива не тільки сьогодні, а кожного дня! Радий, що в цей день в тебе є така неймовірна компанія, яка впевнений гарантує тобі гарний настрій й купу пам\'ятних моментів!',
    photo: photo10,
    photoColor: 'from-rose-400 to-red-400',
  },
]

// ─── ОДНА КАРТКА ────────────────────────────────────────────────────────────
function MemoryCard({ memory, index }) {
  const ref = useRef(null)
  // Запускаємо анімацію коли картка входить у viewport
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0 // чергуємо: парні зліва, непарні справа

  const Icon = memory.icon

  return (
    <div ref={ref} className={`flex items-center gap-4 md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>

      {/* Картка */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`flex-1 ${memory.bg} border ${memory.border} rounded-2xl p-5 md:p-6 shadow-md hover:shadow-xl transition-shadow duration-300`}
      >
        {/* Дата */}
        <span className="text-xs font-semibold text-rose-400 dark:text-rose-400 uppercase tracking-widest">
          {memory.date}
        </span>

        {/* Фото або заглушка */}
        <div className={`my-3 w-full h-40 md:h-48 rounded-xl bg-gradient-to-br ${memory.photoColor} flex items-center justify-center overflow-hidden`}>
          {memory.photo
            ? <img src={memory.photo} alt={memory.title} className="w-full h-full object-cover" />
            : (
              <div className="text-center text-white/80">
                <FaCamera className="text-3xl mx-auto mb-2" />
                <p className="text-sm">Додай фото сюди</p>
              </div>
            )
          }
        </div>

        {/* Текст */}
        <h3 className="text-lg md:text-xl font-bold text-rose-700 dark:text-rose-200 mb-2">
          {memory.title}
        </h3>
        <p className="text-sm md:text-base text-rose-600/80 dark:text-rose-300/80 leading-relaxed">
          {memory.text}
        </p>
      </motion.div>

      {/* Центральна точка на лінії */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
        className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${memory.color} shadow-lg flex items-center justify-center z-10`}
      >
        <Icon className="text-white text-lg md:text-xl" />
      </motion.div>

      {/* Порожнє місце з іншого боку (для десктопу) */}
      <div className="flex-1 hidden md:block" />
    </div>
  )
}

// ─── ГОЛОВНИЙ КОМПОНЕНТ ──────────────────────────────────────────────────────
export default function Timeline() {
  return (
    <section
      id="timeline"
      className="py-20 px-4 bg-gradient-to-b from-white to-rose-50 dark:from-rose-950 dark:to-rose-900/50 relative overflow-hidden"
    >
      {/* Заголовок секції */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
         <p className="text-rose-500/70 dark:text-rose-400/70 text-lg max-w-lg mx-auto">
          Перед основною частиною привітання, хочу розповісти про те..
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-rose-600 dark:text-rose-300 mb-4">
          Як я став твоїм найбільшим фанатом
        </h2>
        <p className="text-rose-500/70 dark:text-rose-400/70 text-lg max-w-lg mx-auto">
          Моменти та Історія 📖
        </p>
        <p className="text-rose-500/70 dark:text-rose-400/70 text-lg max-w-lg mx-auto">
          Псс.. люблю тебе 
        </p>
        {/* Декоративна лінія під заголовком */}
        <div className="mt-4 w-20 h-1 bg-gradient-to-r from-rose-400 to-fuchsia-400 rounded-full mx-auto" />
      </motion.div>

      {/* Контейнер таймлайну */}
      <div className="max-w-3xl mx-auto relative">

        {/* Вертикальна лінія посередині */}
        <div className="absolute left-[46px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-200 via-fuchsia-300 to-rose-200 dark:from-rose-700 dark:via-fuchsia-700 dark:to-rose-700 -translate-x-1/2" />

        {/* Картки */}
        <div className="flex flex-col gap-10 md:gap-14">
          {MEMORIES.map((memory, index) => (
            <MemoryCard key={memory.id} memory={memory} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}