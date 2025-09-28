import React from 'react'
import Sidebar from './Sidebar.jsx'
import PlayerBar from './PlayerBar.jsx'

export default function Layout({ children }) {
  return (
    <div className="h-full grid grid-rows-[1fr_auto]">
      <div className="grid grid-cols-[260px_1fr] gap-2 p-2">
        <aside className="bg-neutral-900/60 rounded-lg overflow-hidden">
          <Sidebar />
        </aside>
        <main className="bg-neutral-900/60 rounded-lg overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-thin p-6">
            {children}
          </div>
        </main>
      </div>
      <PlayerBar />
    </div>
  )
}


