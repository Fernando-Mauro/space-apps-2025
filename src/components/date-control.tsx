"use client"

import { useState } from "react"
import { PlayCircle, PauseCircle, ChevronUp, ChevronDown, SkipForward } from "lucide-react"

interface DateControlProps {
  onStatusChange?: (status: { isPlaying: boolean; date: Date }) => void
}

export function DateControl({ onStatusChange }: DateControlProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  const handlePlayPause = () => {
    const newPlayingState = !isPlaying
    setIsPlaying(newPlayingState)
    onStatusChange?.({ isPlaying: newPlayingState, date: currentDate })
  }

  const handleDayChange = (increment: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + increment)
    setCurrentDate(newDate)
    onStatusChange?.({ isPlaying, date: newDate })
  }

  const handleMonthChange = (increment: number) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + increment)
    setCurrentDate(newDate)
    onStatusChange?.({ isPlaying, date: newDate })
  }

  const handleYearChange = (increment: number) => {
    const newDate = new Date(currentDate)
    newDate.setFullYear(newDate.getFullYear() + increment)
    setCurrentDate(newDate)
    onStatusChange?.({ isPlaying, date: newDate })
  }

  const handleSkipForward = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
    onStatusChange?.({ isPlaying, date: newDate })
  }

  const day = currentDate.getDate()
  const month = currentDate.toLocaleDateString("es-ES", { month: "short" })
  const year = currentDate.getFullYear()

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl bg-slate-700/40 backdrop-blur-md border border-slate-600/30 px-4 py-3 shadow-xl">
      {/* Play/Pause Button */}
      <button
        onClick={handlePlayPause}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-600/50 hover:bg-slate-600/70 transition-colors"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <PauseCircle className="w-6 h-6 text-white" /> : <PlayCircle className="w-6 h-6 text-white" />}
      </button>

      <div className="flex items-center gap-2">
        {/* Day Control */}
        <div className="flex flex-col items-center gap-0.5">
          <button
            onClick={() => handleDayChange(1)}
            className="text-slate-300 hover:text-white transition-colors"
            aria-label="Increase day"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center min-w-[32px] text-white font-medium text-base">{day}</div>
          <button
            onClick={() => handleDayChange(-1)}
            className="text-slate-300 hover:text-white transition-colors"
            aria-label="Decrease day"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Month Control */}
        <div className="flex flex-col items-center gap-0.5">
          <button
            onClick={() => handleMonthChange(1)}
            className="text-slate-300 hover:text-white transition-colors"
            aria-label="Increase month"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center min-w-[40px] text-white font-medium text-sm">{month}</div>
          <button
            onClick={() => handleMonthChange(-1)}
            className="text-slate-300 hover:text-white transition-colors"
            aria-label="Decrease month"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Year Control */}
        <div className="flex flex-col items-center gap-0.5">
          <button
            onClick={() => handleYearChange(1)}
            className="text-slate-300 hover:text-white transition-colors"
            aria-label="Increase year"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center min-w-[48px] text-white font-medium text-base">{year}</div>
          <button
            onClick={() => handleYearChange(-1)}
            className="text-slate-300 hover:text-white transition-colors"
            aria-label="Decrease year"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Skip Forward Button */}
      <button
        onClick={handleSkipForward}
        className="flex items-center justify-center w-8 h-8 text-slate-300 hover:text-white transition-colors"
        aria-label="Skip forward"
      >
        <SkipForward className="w-5 h-5" />
      </button>
    </div>
  )
}