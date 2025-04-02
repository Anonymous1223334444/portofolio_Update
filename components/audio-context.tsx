"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react"

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

interface AudioContextType {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  isLoading: boolean
  togglePlay: () => void
  toggleMute: () => void
  setVolume: (value: number) => void
}

const AudioPlayerContext = createContext<AudioContextType | undefined>(undefined)

export const useAudio = () => {
  const context = useContext(AudioPlayerContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isLoading, setIsLoading] = useState(true)
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const playAudio = useCallback(() => {
    if (!audioContextRef.current || !audioBufferRef.current || !gainNodeRef.current) return

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume()
    }

    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop()
    }

    sourceNodeRef.current = audioContextRef.current.createBufferSource()
    sourceNodeRef.current.buffer = audioBufferRef.current
    sourceNodeRef.current.loop = true
    sourceNodeRef.current.connect(gainNodeRef.current)
    gainNodeRef.current.gain.value = isMuted ? 0 : volume
    sourceNodeRef.current.start()
    setIsPlaying(true)
  }, [isMuted, volume])

  useEffect(() => {
    const initAudio = async () => {
      if (typeof window === "undefined") return

      try {
        // Create audio context on user interaction
        const handleInteraction = () => {
          if (audioContextRef.current) return

          const webAudioContext = window.AudioContext || window.webkitAudioContext
          audioContextRef.current = new webAudioContext()
          gainNodeRef.current = audioContextRef.current.createGain()
          gainNodeRef.current.connect(audioContextRef.current.destination)

          // Load and play audio
          fetch("/music/background-music.mp3")
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) => {
              if (audioContextRef.current) {
                audioContextRef.current.decodeAudioData(arrayBuffer).then((audioBuffer) => {
                  audioBufferRef.current = audioBuffer
                  setIsLoading(false)
                  playAudio()
                })
              }
            })
            .catch((error) => {
              console.error("Error loading audio:", error)
              setIsLoading(false)
            })

          // Remove event listeners after first interaction
          window.removeEventListener("click", handleInteraction)
          window.removeEventListener("touchstart", handleInteraction)
        }

        window.addEventListener("click", handleInteraction)
        window.addEventListener("touchstart", handleInteraction)

        return () => {
          window.removeEventListener("click", handleInteraction)
          window.removeEventListener("touchstart", handleInteraction)
        }
      } catch (error) {
        console.error("Error initializing audio:", error)
        setIsLoading(false)
      }
    }

    initAudio()

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [playAudio])

  const pauseAudio = () => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop()
      setIsPlaying(false)
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio()
    } else {
      playAudio()
    }
  }

  const toggleMute = () => {
    if (!gainNodeRef.current || !audioContextRef.current) return

    setIsMuted(!isMuted)
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(!isMuted ? 0 : volume, audioContextRef.current.currentTime)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (gainNodeRef.current && !isMuted) {
      gainNodeRef.current.gain.value = newVolume
    }
  }

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        isLoading,
        togglePlay,
        toggleMute,
        setVolume: handleVolumeChange,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}
