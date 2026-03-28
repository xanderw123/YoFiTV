'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getCurrentRotationPosition, getUpcomingVideos, formatTime } from '@/lib/rotation'

interface Station {
  id: string
  name: string
  description?: string
}

interface Video {
  id: string
  title: string
  url: string
  duration: number
}

export default function StationPage({ params }: { params: { id: string } }) {
  const [station, setStation] = useState<Station | null>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [upcomingVideos, setUpcomingVideos] = useState<any[]>([])

  useEffect(() => {
    const stations = JSON.parse(localStorage.getItem('stations') || '[]')
    const found = stations.find((s: Station) => s.id === params.id)
    setStation(found)

    const saved = localStorage.getItem(`station-${params.id}-videos`)
    if (saved) {
      setVideos(JSON.parse(saved))
    }
  }, [params.id])

  // Update current video and upcoming videos
  useEffect(() => {
    if (videos.length === 0) return

    const updateRotation = () => {
      const position = getCurrentRotationPosition(videos)
      setCurrentVideoIndex(position.videoIndex % videos.length)
      
      const upcoming = getUpcomingVideos(videos.map(v => ({
        id: v.id,
        title: v.title,
        duration: v.duration || 600,
      })), 3)
      setUpcomingVideos(upcoming)
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

  if (!station) return null

  const currentVideo = videos[currentVideoIndex]
  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
    return match ? match[1] : null
  }

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
          <Link href={`/stations/${params.id}/edit`} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            Edit Rotation
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="col-span-2">
            {currentVideo && videos.length > 0 ? (
              <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <iframe
                  key={`${currentVideo.id}-${currentVideoIndex}`}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${extractVideoId(currentVideo.url)}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ display: 'block' }}
                />
              </div>
            ) : (
              <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center flex-col gap-4">
                <p className="text-gray-400">No videos in rotation</p>
                <Link href={`/stations/${params.id}/edit`} className="px-4 py-2 bg-yofi-green text-black rounded font-bold hover:opacity-90">
                  Add Videos
                </Link>
              </div>
            )}
            {currentVideo && <p className="text-gray-400 text-sm mt-2">Now playing: {currentVideo.title}</p>}
          </div>

          <div className="space-y-3">
            {/* Follow Button */}
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
                isFollowing
                  ? 'bg-yofi-green text-black hover:opacity-90'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              {isFollowing ? 'Following' : 'Follow'}
            </button>

            {/* Followers Stats */}
            <div className="bg-gray-900 p-4 rounded">
              <div className="text-2xl font-bold">0</div>
              <p className="text-gray-400 text-sm">Followers</p>
            </div>

            {/* Upcoming Videos */}
            <div className="bg-gray-900 p-4 rounded">
              <p className="text-sm font-bold mb-3">Coming Up</p>
              <div className="space-y-2">
                {upcomingVideos.slice(1, 4).map((item, i) => (
                  <div key={i} className="text-xs text-gray-400">
                    <p className="truncate">{item.title}</p>
                    <p className="text-gray-500">{formatTime(item.startTime)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Appreciations Button - Coming Soon */}
            <button
              disabled
              className="w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 bg-gray-800 text-gray-600 opacity-50 cursor-not-allowed"
              title="Coming Soon"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Appreciations
            </button>
            <p className="text-xs text-gray-500 text-center">Coming in Phase 2</p>

            {/* Premium Subscriptions Button - Coming Soon */}
            <button
              disabled
              className="w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 bg-gray-800 text-gray-600 opacity-50 cursor-not-allowed"
              title="Coming Soon"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
              Premium Subscriptions
            </button>
            <p className="text-xs text-gray-500 text-center">Coming in Phase 2</p>
          </div>
        </div>

        {/* Chat */}
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Chat
        </h2>
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
    </div>
  )
}