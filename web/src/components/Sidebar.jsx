import React from 'react'
import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors ${
    isActive ? 'bg-neutral-800 text-white' : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
  }`

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 text-xl font-semibold">MySpotify</div>
      <nav className="px-2 space-y-1">
        <NavLink to="/browse" className={linkClass}>Browse</NavLink>
        <NavLink to="/search" className={linkClass}>Search</NavLink>
        <NavLink to="/library" className={linkClass}>Your Library</NavLink>
      </nav>
      <div className="mt-auto p-4 text-xs text-neutral-400">Demo build</div>
    </div>
  )
}


