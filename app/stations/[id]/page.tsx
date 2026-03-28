'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getStation, getStationVideos, Video } from '@/lib/stations'
import { getCurrentStationSession, isStationOwner } from '@/lib/stationAuth'
import { getRotationState, getUpcomingVideos, formatTime } from '@/lib/rotation'

interface Station {
  id: string
  name: string
  description?: string
  settings: {
    showUpNext: boolean
    showChat: boolean
    aboutText?: string
    logoUrl?: string
  }
}

export default function StationPage({ params }: { params: { id: string } }) {
  const session = getCurrentStationSession()
  const [station, setStation] = useState<Station | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [secondsIntoVideo, setSecondsIntoVideo] = useState(0)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [upcomingVideos, setUpcomingVideos] = useState<any[]>([])

  useEffect(() => {
    const stationData = getStation(params.id)
    if (stationData) {
      setStation(stationData)
    }

    const videosData = getStationVideos(params.id)
    if (videosData) {
      setVideos(videosData)
    }
  }, [params.id])

  // Update rotation every second
  useEffect(() => {
    if (videos.length === 0) return

    const updateRotation = () => {
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

  const canEdit = session && isStationOwner(params.id)

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
            <Link href={`/stations/${params.id}/edit`} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
              Edit Station
            </Link>
          )}
        </div>

        {/* Main Player Section */}
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
                <Link href={`/stations/${params.id}/edit`} className="px-4 py-2 bg-yofi-green text-black rounded font-bold hover:opacity-90">
                  Add Videos
                </Link>
              )}
            </div>
          )}

          {/* Now Playing */}
          {currentVideo && (
            <div className="space-y-2">
              <p className="text-gray-300 font-bold">Now playing: {currentVideo.title}</p>
              {currentVideo.description && (
                <p className="text-gray-400 text-sm">{currentVideo.description}</p>
              )}
            </div>
          )}

          {/* Follow Button - Under Video */}
          {videos.length > 0 && (
            <div className="mt-6">
              <button className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                <Image
                  src="/icons/follow.svg"
                  alt="Follow"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left - Chat */}
          {station.settings.showChat && (
            <div className="col-span-2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Image
                  src="/icons/conversation.svg"
                  alt="Chat"
                  width={24}
                  height={24}
                />
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
          )}

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* About the Station */}
            {station.settings.aboutText && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-3">About</h3>
                <p className="text-gray-400 text-sm">{station.settings.aboutText}</p>
              </div>
            )}

            {/* Coming Up */}
            {station.settings.showUpNext && upcomingVideos.length > 0 && (
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

            {/* Appreciations - Coming Soon */}
            <button
              disabled
              className="w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 bg-gray-800 text-gray-600 opacity-50 cursor-not-allowed"
              title="Coming Soon"
            >
              <Image
                src="/icons/Appreciation.svg"
                alt="Appreciation"
                width={18}
                height={18}
              />
            </button>
            <p className="text-xs text-gray-500 text-center">Coming in Phase 2</p>

            {/* Premium Subscriptions - Coming Soon */}
            <button
              disabled
              className="w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 bg-gray-800 text-gray-600 opacity-50 cursor-not-allowed"
              title="Coming Soon"
            >
              <Image
                src="/icons/subscribe.svg"
                alt="Subscribe"
                width={18}
                height={18}
              />
            </button>
            <p className="text-xs text-gray-500 text-center">Coming in Phase 2</p>
          </div>
        </div>
      </div>
    </div>
  )
}