import React, { useMemo } from 'react'
import { DEMO_TRACKS } from '../data/tracks.js'
import TrackItem from '../components/TrackItem.jsx'

export default function Browse() {
  const tracks = useMemo(() => DEMO_TRACKS, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Browse</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((t, i) => (
          <div key={t.id} className="bg-neutral-900/80 rounded-lg p-4">
            <div className="h-32 bg-neutral-800 rounded mb-3" />
            <div className="text-sm font-semibold mb-1 truncate">{t.title}</div>
            <div className="text-xs text-neutral-400 mb-3 truncate">{t.artist}</div>
            <TrackItem track={t} index={i} tracks={tracks} />
          </div>
        ))}
      </div>
    </div>
  )
}


