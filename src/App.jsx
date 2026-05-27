// src/App.jsx
import { useTheme } from './hooks/useTheme'
import FloatingHearts from './components/FloatingHearts/FloatingHearts'
import Navbar from './components/Navbar/Navbar'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import Hero from './components/Hero/Hero'
import Timeline from './components/Timeline/Timeline'
import Gallery from './components/Gallery/Gallery'
import SecretMessage from './components/SecretMessage/SecretMessage'
import Finale from './components/Finale/Finale'

export default function App() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="relative">
      <FloatingHearts />
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <MusicPlayer />

      <section id="hero">
        <Hero onOpen={() =>
          document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
        } />
      </section>

      <Timeline />
      <SecretMessage />
      <Gallery />
        
      <Finale />
    </div>
  )
}