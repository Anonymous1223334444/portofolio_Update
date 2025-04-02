"use client"

import { motion } from "framer-motion"
import { Volume2, VolumeX, Play, Pause, Loader } from "lucide-react"
import { useAudio } from "./audio-context"

export function AudioPlayer() {
  const { isPlaying, isMuted, togglePlay, toggleMute, volume, setVolume, isLoading } = useAudio()

  return (
    <div className="fixed bottom-4 left-4 z-[9997]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg flex items-center gap-2"
      >
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={toggleMute}
          disabled={isLoading}
          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        {/* Simple volume control */}
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={(e) => setVolume(Number(e.target.value) / 100)}
          disabled={isLoading}
          className="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex items-end h-5 gap-0.5">
          {[0.75, 1, 0.5].map((height, index) => (
            <motion.div
              key={index}
              className="w-1 bg-blue-500 rounded-t"
              animate={{
                height: isPlaying && !isMuted ? [height * 20, height * 10, height * 15] : 5,
              }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

