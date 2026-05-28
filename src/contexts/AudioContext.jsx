// src/contexts/AudioContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from 'react'

const AudioContext = createContext(null)

export function AudioProvider({ children }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady]     = useState(false)

  useEffect(() => {
    const audio = new Audio('/music/background.mp3')
    audio.loop   = true
    audio.volume = 0.05
    audio.addEventListener('canplaythrough', () => setIsReady(true))
    audioRef.current = audio
    return () => { audio.pause(); audio.src = '' }
  }, [])

  const play = () => {
    audioRef.current?.play().catch(() => {})
    setIsPlaying(true)
  }

  const pause = () => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }

  const toggle = () => (isPlaying ? pause() : play())

  return (
    <AudioContext.Provider value={{ isPlaying, isReady, play, pause, toggle }}>
      {children}
    </AudioContext.Provider>
  )
}

// Хук для зручного використання в будь-якому компоненті
export function useAudio() {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used inside AudioProvider')
  return ctx
}