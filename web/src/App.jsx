import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PlayerProvider } from './context/PlayerContext.jsx'
import Layout from './components/Layout.jsx'
import Browse from './pages/Browse.jsx'
import Search from './pages/Search.jsx'
import Library from './pages/Library.jsx'
import Playlist from './pages/Playlist.jsx'

export default function App() {
  return (
    <PlayerProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/browse" replace />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="*" element={<Navigate to="/browse" replace />} />
        </Routes>
      </Layout>
    </PlayerProvider>
  )
}


