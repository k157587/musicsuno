import React from 'react'
import { usePlayer } from '../context/PlayerContext.jsx'

function formatTime(s) {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return `${m}:${r.toString().padStart(2, '0')}`
}

export default function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    toggle,
    next,
    previous,
    seek,
    volume,
    setVolume,
    muted,
    toggleMute
  } = usePlayer()

  return (
    <div className="h-20 bg-neutral-950/90 border-t border-neutral-800 grid grid-cols-3 items-center px-4 gap-4">
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="w-14 h-14 bg-neutral-800 rounded shadow-inner" />
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">{currentTrack?.title || 'Nothing playing'}</div>
          <div className="text-xs text-neutral-400 truncate">{currentTrack?.artist || '—'}</div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <button onClick={previous} className="px-2 py-1 text-neutral-300 hover:text-white">⏮</button>
          <button onClick={toggle} className="px-4 py-1 bg-white text-black rounded-full font-semibold">
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={next} className="px-2 py-1 text-neutral-300 hover:text-white">⏭</button>
        </div>
        <div className="w-full max-w-xl flex items-center gap-3 text-xs text-neutral-400">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Number.isFinite(currentTime) ? currentTime : 0}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="w-full accent-green-500"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button onClick={toggleMute} className="text-neutral-300 hover:text-white text-sm w-10">
          {muted || volume === 0 ? '🔇' : volume < 0.5 ? '🔈' : '🔊'}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-32 accent-green-500"
        />
      </div>
    </div>
  )
}


