import React from 'react'
import { usePlayer } from '../context/PlayerContext.jsx'

export default function TrackItem({ track, index, tracks }) {
  const { playTrackList, currentTrack, isPlaying } = usePlayer()
  const active = currentTrack?.id === track.id
  return (
    <button
      onClick={() => playTrackList(tracks, index)}
      className={`w-full grid grid-cols-[1fr_auto_auto] gap-4 items-center px-3 py-2 rounded-md text-left hover:bg-neutral-800/60 ${active ? 'bg-neutral-800' : ''}`}
    >
      <div>
        <div className="text-sm font-medium truncate">{track.title}</div>
        <div className="text-xs text-neutral-400 truncate">{track.artist}</div>
      </div>
      <div className="text-xs text-neutral-400">{Math.floor(track.duration / 60)}:{String(Math.floor(track.duration % 60)).padStart(2, '0')}</div>
      <div className="text-xs">{active && isPlaying ? '▶' : '♪'}</div>
    </button>
  )
}


