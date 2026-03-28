'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Station {
  id: string
  name: string
  description?: string
}

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isSignedIn = localStorage.getItem('beta_token')
    if (!isSignedIn) {
      window.location.href = '/'
      return
    }

    // Mock data for now
    setStations([
      { id: '1', name: 'Lofi Vibes', description: '24/7 lofi hip hop' },
      { id: '2', name: 'Synthwave Nights', description: '80s synthwave classics' },
      { id: '3', name: 'Jazz Standards', description: 'Timeless jazz recordings' },
    ])
    setLoading(false)
  }, [])

  if (loading) return null

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Browse Stations</h1>
        <p className="text-gray-400 mb-12">Discover stations. Follow curators. Always on.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((station) => (
            <Link key={station.id} href={`/stations/${station.id}`}>
              <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">▶</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{station.name}</h3>
                <p className="text-gray-400 text-sm">{station.description}</p>
                <p className="text-gray-500 text-xs mt-4">Live • Always On</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}