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
import photo4 from '../../assets/photos/13.jpg'
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
    text: 'Й вже з перших повідомлень Ти почала мені подобатись! Твої смаки, твої захоплення були такими близькими мені, що я ловив себе на думці чи справді все так й чи не рожеві це окуляри. А вже почувши твій голос, я взагалі розтанув) Й окремо ще хотів відмітити початок нашого спільного перегляду Мао Мао, серії йшли неймовірно швидко й з кожною серію я все більше хотів подивитися щось з тобою вже в живу', 
    photo: photo1,
    photoColor: 'from-rose-300 to-pink-400',
  },
  {
    id: 2,    
    date: 'Перша зустріч',
    icon: FaMap,
    color: 'from-fuchsia-400 to-purple-500',
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/30',
    border: 'border-fuchsia-200 dark:border-fuchsia-700',
    title: 'Й наша перша прогулянка',
    text: 'Пам\'ятаю як я бігав очима як тільки вийшов з автобуса шукавши тебе, а як побачив на пару секунд забув й як говорити XD Ти виявилась ще гарнішою ніж на фото, а я тоді дарма переживав за зачіску… хоча, як виявилось, не тільки я 😄 І сам день пройшов дуже класно. Досі дивуюсь, як я тоді нічого не встиг начудити)',
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
    text: 'Незважаючи на шум генераторів та незовсім сприятливу погоду з тобою було спокійно та затишно. ТТвої обійми були такими ж ніжними й теплими, як і зараз. Я досі пам’ятаю, яким щасливим повертався додому після того дня. Але досі пам\'ятаю той мій затуп, що  так і не наважився тебе поцілувати 😄',
    photo: photo3,
    photoColor: 'from-amber-300 to-rose-300',
  },
  {
    id: 4,
    date: 'З тобою вони неймовірні',
    icon: FaMusic,
    color: 'from-violet-400 to-fuchsia-500',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    border: 'border-violet-200 dark:border-violet-700',
    title: 'Звісно ж прогуляночки разом',
    text: 'Вдвох чи з Норою, розмовляючи про все що завгодно або ж просто в тиші, час з тобою найкращий! Завжди мріяв про таку приємну рутину з кимось особливим)',
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
    text: 'Той Новий рік, звісно, пролетів швидше, ніж хотілося б, але він вийшов дуже теплим і затишним. Особливо мені сподобалась частина, де ти розпаковувала подаруночки - ти була така щаслива й мила, примірюючи кожну річ. Мабуть, саме тоді, я ще сильніше закріпив своє бажання зробити якомога більше, щоб бачити тебе такою радісною частіше!',
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
    text: 'Хоча дивлячись на історію наших ігор доречніше було б написати, що я обожнюю програвати XD Але це не так! Я обов\'язково переможу наступного разу!)',
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
    text: 'Хоча я ще здебільшого лиш асистую тобі, проте запевняю! Що з часом теж були радувати тебе своїми кулінарними штуками й я зараз не тільки про шашлик XD',
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
    text: 'Всі дні з тобою неймовірно затишні та веселі, але тоді додався ще якийсь особливий вайб 😄 Особливо коли вимкнули світло й довелося прикрашати пасочки при світлі одного ліхтарика. Загалом все було так мило, що пасочки розчулились й потекли 😄 інакших теорій чому так сталося я не маю)',
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
    text: 'Й хочу, щоб ти так само обожнювала себе!) Ти неймовірна, талановита, красива, розумна, весела, добра й ще багато інших класних якостей, які я не втомлююсь помічати в тобі кожного дня! Й не соромся розслаблятися поруч зі мною, я тебе завжди підтримаю!)',
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: 'easeOut' },
  }),
}

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
         <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="text-lg md:text-2xl text-rose-500 dark:text-rose-400 mb-2 font-medium"
          >
          І такс хехе) перед основною частиною привітання
        </motion.p>
        <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="text-lg md:text-2xl text-rose-500 dark:text-rose-400 mb-2 font-medium"
          >
          мені б хотілося показати тобі частинку наших з тобою спогадів, які я дуже ціную.
        </motion.p>
        <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="text-lg md:text-2xl text-rose-500 dark:text-rose-400 mb-2 font-medium"
          >
          Або ж короче кажучи міні історія про те ..
        </motion.p>
        
        <h2 className="text-3xl md:text-5xl font-bold text-rose-600 dark:text-rose-300 mb-4">
          Як я став твоїм найбільшим фанатом
        </h2>
        <p className="text-rose-500/70 dark:text-rose-400/70 text-lg max-w-lg mx-auto">
          Зроблено з любов'ю та щирістю ❤️
        </p>
        <p className="text-rose-500/70 dark:text-rose-400/70 text-lg max-w-lg mx-auto">
          Обожнюю тебе, з Днем народження! 🎉 
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