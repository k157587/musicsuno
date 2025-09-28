import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

const PlayerContext = createContext(null)

const DEFAULT_VOLUME = 0.7

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [queue, setQueue] = useState(() => loadFromStorage('queue', []))
  const [currentIndex, setCurrentIndex] = useState(() => loadFromStorage('currentIndex', 0))
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(() => loadFromStorage('volume', DEFAULT_VOLUME))
  const [muted, setMuted] = useState(false)

  const currentTrack = queue[currentIndex] || null

  useEffect(() => {
    saveToStorage('queue', queue)
  }, [queue])

  useEffect(() => {
    saveToStorage('currentIndex', currentIndex)
  }, [currentIndex])

  useEffect(() => {
    saveToStorage('volume', volume)
  }, [volume])

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.preload = 'metadata'
    }
    const audio = audioRef.current
    audio.volume = muted ? 0 : volume

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onLoaded = () => setDuration(audio.duration || 0)
    const onEnded = () => next()
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [muted, volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (currentTrack?.url) {
      const wasPlaying = !audio.paused
      audio.src = currentTrack.url
      audio.currentTime = 0
      audio.play().catch(() => {})
      setIsPlaying(true)
      if (!wasPlaying) setIsPlaying(false)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }, [currentTrack?.url])

  function playTrackList(tracks, startIndex = 0) {
    setQueue(tracks)
    setCurrentIndex(Math.max(0, Math.min(startIndex, tracks.length - 1)))
  }

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }

  function next() {
    setCurrentIndex((i) => (i + 1 < queue.length ? i + 1 : 0))
  }

  function previous() {
    setCurrentIndex((i) => (i - 1 >= 0 ? i - 1 : Math.max(queue.length - 1, 0)))
  }

  function seek(seconds) {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min(seconds, duration || audio.duration || 0))
    setCurrentTime(audio.currentTime)
  }

  function setVolumeSafe(v) {
    const audio = audioRef.current
    const nv = Math.max(0, Math.min(1, v))
    setVolume(nv)
    if (audio) audio.volume = muted ? 0 : nv
  }

  function toggleMute() {
    const audio = audioRef.current
    const newMuted = !muted
    setMuted(newMuted)
    if (audio) audio.volume = newMuted ? 0 : volume
  }

  const value = useMemo(() => ({
    queue,
    currentIndex,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    muted,
    playTrackList,
    toggle,
    next,
    previous,
    seek,
    setVolume: setVolumeSafe,
    toggleMute,
    setCurrentIndex,
    setQueue
  }), [queue, currentIndex, currentTrack, isPlaying, currentTime, duration, volume, muted])

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}


