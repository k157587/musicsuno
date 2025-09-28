import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { DEMO_TRACKS } from '../data/tracks.js'
import TrackItem from '../components/TrackItem.jsx'

function loadPlaylists() {
  try {
    const raw = localStorage.getItem('playlists')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function Playlist() {
  const { id } = useParams()
  const playlists = useMemo(() => loadPlaylists(), [])
  const playlist = playlists.find(p => p.id === id)
  const tracks = useMemo(() => (playlist?.trackIds||[]).map(tid => DEMO_TRACKS.find(t => t.id === tid)).filter(Boolean), [playlist])

  if (!playlist) return <div className="space-y-6"><h1 className="text-2xl font-bold">Playlist not found</h1></div>

  return (
    <div className="space-y-6">
      <div className="flex items-end gap-4">
        <div className="w-40 h-40 bg-neutral-800 rounded" />
        <div>
          <div className="text-xs text-neutral-400">Playlist</div>
          <h1 className="text-4xl font-extrabold">{playlist.title}</h1>
          <div className="text-xs text-neutral-400 mt-1">{tracks.length} tracks</div>
        </div>
      </div>
      <div className="space-y-1">
        {tracks.map((t, i) => (
          <TrackItem key={t.id} track={t} index={i} tracks={tracks} />
        ))}
      </div>
    </div>
  )
}


