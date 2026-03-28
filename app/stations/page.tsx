'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Station {
  id: string
  name: string
  description?: string
}

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('stations')
    if (saved) {
      setStations(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  if (loading) return null

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Browse Stations</h1>
            <p className="text-gray-400">Discover stations. Follow creators. Curate your experience.</p>
          </div>
          <Link href="/create" className="px-6 py-2 bg-yellow-300 text-black rounded-lg font-bold hover:bg-yellow-400">
            + Create
          </Link>
        </div>

        {stations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-6">No stations yet. Create one to get started!</p>
            <Link href="/create" className="inline-block px-8 py-3 bg-yellow-300 text-black rounded-lg font-bold hover:bg-yellow-400">
              Create Your Station
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stations.map((station) => (
              <Link key={station.id} href={`/stations/${station.id}`}>
                <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 cursor-pointer transition">
                  <div className="w-full aspect-square bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl">▶</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{station.name}</h2>
                  {station.description && (
                    <p className="text-gray-400 text-sm">{station.description}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-4">Live • Always On</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}