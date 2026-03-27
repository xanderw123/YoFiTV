'use client'

import { useEffect, useState } from 'react'
import { Player } from '@/components/Player'
import { Chat } from '@/components/Chat'

interface StationDetail {
  id: string
  name: string
  description?: string
  creator_id: string
  primary_color: string
  secondary_color: string
}

export default function StationPage({ params }: { params: { stationId: string } }) {
  const [station, setStation] = useState<StationDetail | null>(null)
  const [followers, setFollowers] = useState(0)
  const [tips, setTips] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const res = await fetch(`/api/stations/${params.stationId}`)
        const data = await res.json()

        if (data.success) {
          setStation(data.station)
        } else {
          setError(data.error)
        }
      } catch (err) {
        setError('Failed to load station')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStation()
  }, [params.stationId])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Loading station...</div>
      </div>
    )
  }

  if (error || !station) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-500">{error || 'Station not found'}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{station.name}</h1>
          {station.description && <p className="text-gray-400">{station.description}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Player stationId={station.id} />
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-400">{followers}</div>
              <div className="text-gray-400 text-sm">Followers</div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400">${(tips / 100).toFixed(2)}</div>
              <div className="text-gray-400 text-sm">Total Tips</div>
            </div>

            <div className="space-y-2">
              <button className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300">Send Tip 💚</button>
              <button className="w-full bg-gray-800 text-white font-bold py-2 rounded hover:bg-gray-700">Follow</button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Chat</h2>
          <Chat stationId={station.id} />
        </div>
      </div>
    </div>
  )
}
