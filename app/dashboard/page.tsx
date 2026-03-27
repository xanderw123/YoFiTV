'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/auth'
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
  const [isFollowing, setIsFollowing] = useState(false)
  const user = getCurrentUser()

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

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Followers */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-400">{followers}</div>
              <div className="text-gray-400 text-sm">Followers</div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`w-full py-2 rounded font-bold flex items-center justify-center gap-2 transition ${
                  isFollowing
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <span className={isFollowing ? '✓' : '+'}</span>
                {isFollowing ? 'Following' : 'Follow Station'}
              </button>

              {/* Appreciation Button - Dimmed */}
              <div
                className="w-full py-2 rounded font-bold flex items-center justify-center gap-2 bg-gray-800 text-gray-600 opacity-50 cursor-not-allowed group relative"
                title="Appreciations: Coming Soon"
              >
                <span>💚</span>
                Appreciation
                <div className="absolute bottom-full mb-2 px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
                  Coming Soon
                </div>
              </div>

              {/* Subscription Button - Dimmed */}
              <div
                className="w-full py-2 rounded font-bold flex items-center justify-center gap-2 bg-gray-800 text-gray-600 opacity-50 cursor-not-allowed group relative"
                title="Subscriptions: Coming Soon"
              >
                <span>🔔</span>
                Subscribe
                <div className="absolute bottom-full mb-2 px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat */}
        {user?.isBeta && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Chat</h2>
            <Chat stationId={station.id} userId={user.id} />
          </div>
        )}
      </div>
    </div>
  )
}