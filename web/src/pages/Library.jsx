import React, { useEffect, useMemo, useState } from 'react'
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

function savePlaylists(data) {
  try { localStorage.setItem('playlists', JSON.stringify(data)) } catch {}
}

export default function Library() {
  const [playlists, setPlaylists] = useState(() => loadPlaylists())
  const [name, setName] = useState('')
  const tracks = useMemo(() => DEMO_TRACKS, [])

  useEffect(() => { savePlaylists(playlists) }, [playlists])

  function createPlaylist() {
    const title = name.trim()
    if (!title) return
    const id = `${Date.now()}`
    setPlaylists([{ id, title, trackIds: [] }, ...playlists])
    setName('')
  }

  function addToPlaylist(pid, tid) {
    setPlaylists(ps => ps.map(p => p.id === pid ? { ...p, trackIds: Array.from(new Set([...(p.trackIds||[]), tid])) } : p))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Library</h1>
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New playlist name"
          className="flex-1 bg-neutral-800 rounded px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
        />
        <button onClick={createPlaylist} className="px-4 py-3 bg-green-600 rounded text-sm font-semibold">Create</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm text-neutral-400">All Tracks</div>
          {tracks.map((t) => (
            <div key={t.id} className="bg-neutral-900/70 rounded p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{t.title}</div>
                  <div className="text-xs text-neutral-400">{t.artist}</div>
                </div>
                <div className="flex gap-2">
                  {playlists.map(p => (
                    <button key={p.id} onClick={() => addToPlaylist(p.id, t.id)} className="px-2 py-1 text-xs bg-neutral-800 rounded hover:bg-neutral-700">Add to {p.title}</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <div className="text-sm text-neutral-400">Playlists</div>
          {playlists.length === 0 && <div className="text-neutral-400 text-sm">No playlists yet</div>}
          {playlists.map(p => {
            const pts = (p.trackIds||[]).map(id => tracks.find(t => t.id === id)).filter(Boolean)
            return (
              <div key={p.id} className="bg-neutral-900/70 rounded p-3">
                <div className="font-semibold mb-2">{p.title}</div>
                {pts.length === 0 && <div className="text-xs text-neutral-500">Empty playlist</div>}
                {pts.map((t, i) => (
                  <TrackItem key={t.id} track={t} index={i} tracks={pts} />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


