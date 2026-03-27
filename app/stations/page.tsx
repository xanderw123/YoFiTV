'use client'

import { useEffect, useState } from 'react'
import { StationCard } from '@/components/StationCard'

interface Station {
  id: string
  name: string
  description?: string
  primary_color: string
  secondary_color: string
  logo_type: string
}

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await fetch('/api/stations?limit=50')
        const data = await res.json()

        if (data.success) {
          setStations(data.stations)
        } else {
          setError(data.error)
        }
      } catch (err) {
        setError('Failed to load stations')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStations()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Browse Stations</h1>
        <p className="text-gray-400 mb-12">Discover creators. Always on. Always live.</p>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400">Loading stations...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500">{error}</div>
          </div>
        ) : stations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400">No stations available yet</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stations.map((station) => (
              <StationCard key={station.id} id={station.id} name={station.name} description={station.description} primary_color={station.primary_color} secondary_color={station.secondary_color} logo_type={station.logo_type} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
