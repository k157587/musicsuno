import React, { useMemo, useState } from 'react'
import { DEMO_TRACKS } from '../data/tracks.js'
import TrackItem from '../components/TrackItem.jsx'

export default function Search() {
  const [q, setQ] = useState('')
  const tracks = useMemo(() => DEMO_TRACKS, [])
  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase()
    if (!k) return tracks
    return tracks.filter(t =>
      t.title.toLowerCase().includes(k) || t.artist.toLowerCase().includes(k)
    )
  }, [q, tracks])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Search</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="What do you want to listen to?"
        className="w-full bg-neutral-800 rounded px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
      />
      <div className="space-y-1">
        {filtered.map((t, i) => (
          <TrackItem key={t.id} track={t} index={i} tracks={filtered} />
        ))}
      </div>
    </div>
  )
}


