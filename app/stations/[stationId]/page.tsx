'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getCurrentStationSession, isStationOwner } from '@/lib/stationAuth'
import { getRotationState, getUpcomingVideos, formatTime } from '@/lib/rotation'
import { getStation, getStationVideos, Video } from '@/lib/stations'

interface Station {
  id: string
  name: string
  description?: string
  settings?: {
    showUpNext?: boolean
    showChat?: boolean
    aboutText?: string
    logoUrl?: string
  }
}

export default function StationPage({ params }: { params: { stationId: string } }) {
  const session = getCurrentStationSession()
  const [station, setStation] = useState<Station | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [secondsIntoVideo, setSecondsIntoVideo] = useState(0)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [upcomingVideos, setUpcomingVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stationData = getStation(params.stationId)
      if (stationData) {
        setStation(stationData)
      } else {
        setError('Station not found')
      }

      const videosData = getStationVideos(params.stationId)
      setVideos(videosData)
    } catch (err) {
      console.error('Error loading station:', err)
      setError('Failed to load station')
    } finally {
      setLoading(false)
    }
  }, [params.stationId])

  useEffect(() => {
    if (videos.length === 0) return

    const updateRotation = () => {
      try {
        const rotation = getRotationState(videos)
        setCurrentVideoIndex(rotation.currentVideoIndex)
        setSecondsIntoVideo(rotation.secondsIntoCurrentVideo)

        const upcoming = getUpcomingVideos(
          videos.map(v => ({
            id: v.id,
            title: v.title,
            duration: v.duration || 600,
          })),
          3
        )
        setUpcomingVideos(upcoming)
      } catch (err) {
        console.error('Error updating rotation:', err)
      }
    }

    updateRotation()
    const interval = setInterval(updateRotation, 1000)
    return () => clearInterval(interval)
  }, [videos])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setMessages([...messages, message])
      setMessage('')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading station...</p>
      </div>
    )
  }

  if (error || !station) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error || 'Station not found'}</p>
        <Link href="/stations" className="px-4 py-2 bg-yofi-green text-black rounded font-bold">
          Back to Stations
        </Link>
      </div>
    )
  }

  const currentVideo = videos[currentVideoIndex]
  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
    return match ? match[1] : null
  }

  const canEdit = session && isStationOwner(params.stationId)
  const showUpNext = station.settings?.showUpNext !== false
  const showChat = station.settings?.showChat !== false

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/stations" className="text-gray-400 mb-8 inline-block hover:text-white">
          ← Back
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{station.name}</h1>
            {station.description && <p className="text-gray-400">{station.description}</p>}
          </div>
          {canEdit && (
            <Link href={`/stations/${params.stationId}/edit`} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
              Edit Station
            </Link>
          )}
        </div>

        <div className="mb-12">
          {currentVideo && videos.length > 0 ? (
            <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
              <iframe
                key={`${currentVideo.id}-${currentVideoIndex}-${Math.floor(secondsIntoVideo)}`}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${extractVideoId(currentVideo.url)}?autoplay=1&controls=1&modestbranding=1&rel=0&start=${Math.floor(secondsIntoVideo)}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ display: 'block' }}
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center flex-col gap-4 mb-4">
              <p className="text-gray-400">No videos in rotation</p>
              {canEdit && (
                <Link href={`/stations/${params.stationId}/edit`} className="px-4 py-2 bg-yofi-green text-black rounded font-bold hover:opacity-90">
                  Add Videos
                </Link>
              )}
            </div>
          )}

          {currentVideo && (
            <div className="space-y-2">
              <p className="text-gray-300 font-bold">Now playing: {currentVideo.title}</p>
              {currentVideo.description && (
                <p className="text-gray-400 text-sm">{currentVideo.description}</p>
              )}
            </div>
          )}

          {videos.length > 0 && (
            <div className="mt-6">
              <button className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {showChat && (
            <div className="col-span-2">
              <h2 className="text-2xl font-bold mb-4">Chat</h2>
              <div className="bg-gray-900 rounded-lg overflow-hidden flex flex-col h-96">
                <div className="flex-1 overflow-y-auto p-4">
                  {messages.length === 0 ? (
                    <p className="text-gray-500 text-center">No messages yet</p>
                  ) : (
                    messages.map((msg, i) => (
                      <div key={i} className="text-sm text-gray-300 mb-2">
                        You: {msg}
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleSend} className="border-t border-gray-800 p-4 flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message..."
                    className="flex-1 bg-gray-800 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yofi-green"
                  />
                  <button type="submit" className="bg-yofi-green text-black px-4 rounded font-bold hover:opacity-90">
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {station.settings?.aboutText && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-3">About</h3>
                <p className="text-gray-400 text-sm">{station.settings.aboutText}</p>
              </div>
            )}

            {showUpNext && upcomingVideos.length > 0 && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-3">Coming Up</h3>
                <div className="space-y-3">
                  {upcomingVideos.slice(1, 4).map((item, i) => (
                    <div key={i} className="text-sm border-b border-gray-800 pb-2 last:border-0">
                      <p className="text-white truncate font-medium">{item.title}</p>
                      <p className="text-gray-500 text-xs">{formatTime(item.startTime)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              disabled
              className="w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 bg-gray-800 text-gray-600 opacity-50 cursor-not-allowed"
              title="Coming Soon"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <p className="text-xs text-gray-500 text-center">Coming in Phase 2</p>

            <button
              disabled
              className="w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 bg-gray-800 text-gray-600 opacity-50 cursor-not-allowed"
              title="Coming Soon"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
            </button>
            <p className="text-xs text-gray-500 text-center">Coming in Phase 2</p>
          </div>
        </div>
      </div>
    </div>
  )
}