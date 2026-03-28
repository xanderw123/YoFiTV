'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCurrentStationSession } from '@/lib/stationAuth'

interface Station {
  id: string
  name: string
  description?: string
  settings?: {
    logoUrl?: string
  }
}

export default function StationsPage() {
  const session = getCurrentStationSession()
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('stations')
      if (saved) {
        const parsed = JSON.parse(saved)
        setStations(Array.isArray(parsed) ? parsed : [])
      }
    } catch (err) {
      console.error('Error loading stations:', err)
      setStations([])
    }
    setLoading(false)
  }, [])

  if (loading) return null

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <img src="/logos/YoFi TV Icon.svg" alt="YoFi TV" className="w-10 h-10 mb-2" />
            <h1 className="text-4xl font-bold mb-2">Browse Stations</h1>
            <p className="text-gray-400">Discover stations. Tune in 24/7.</p>
          </div>
          <div className="flex gap-4">
            {session && (
              <Link href="/mystation" className="text-yofi-green hover:opacity-90 font-bold">
                My Station
              </Link>
            )}
            <Link href="/guide" className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              Guide
            </Link>
            <Link href="/create" className="px-6 py-2 bg-yofi-green text-black rounded-lg font-bold hover:opacity-90">
              + Create
            </Link>
          </div>
        </div>

        {stations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-6">No stations yet. Create one to get started!</p>
            <Link href="/create" className="inline-block px-8 py-3 bg-yofi-green text-black rounded-lg font-bold hover:opacity-90">
              Create Your Station
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stations.map((station) => (
              <Link key={station.id} href={`/stations/${station.id}`}>
                <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 cursor-pointer transition">
                  <div className="w-full aspect-square bg-black rounded-lg mb-4 flex items-center justify-center border border-gray-800">
                    {station.settings?.logoUrl ? (
                      <img
                        src={station.settings.logoUrl}
                        alt="Station Logo"
                        className="w-auto h-auto max-w-[120px] max-h-[120px]"
                      />
                    ) : (
                      <div className="w-32 h-32 flex items-center justify-center">
                        <span className="text-6xl">▶</span>
                      </div>
                    )}
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