'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Station {
  id: string
  name: string
  description?: string
}

export default function StationPage({ params }: { params: { id: string } }) {
  const [station, setStation] = useState<Station | null>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [videos, setVideos] = useState<any[]>([])

  useEffect(() => {
    const stations = JSON.parse(localStorage.getItem('stations') || '[]')
    const found = stations.find((s: Station) => s.id === params.id)
    setStation(found)

    const saved = localStorage.getItem(`station-${params.id}-videos`)
    if (saved) {
      setVideos(JSON.parse(saved))
    }
  }, [params.id])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setMessages([...messages, message])
      setMessage('')
    }
  }

  if (!station) return null

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/stations" className="text-gray-400 mb-8 inline-block hover:text-white">
          Back
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
            {videos.length > 0 ? (
              <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videos[0].url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)?.[1]}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center flex-col gap-4">
                <p className="text-gray-400">No videos yet</p>
                <Link href={`/stations/${params.id}/edit`} className="px-4 py-2 bg-yellow-300 text-black rounded font-bold hover:bg-yellow-400">
                  Add Videos
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`w-full py-2 rounded font-bold ${isFollowing ? 'bg-yellow-300 text-black' : 'bg-gray-800'}`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>

            <div className="bg-gray-900 p-4 rounded">
              <div className="text-2xl font-bold">0</div>
              <p className="text-gray-400 text-sm">Followers</p>
            </div>

            <div className="bg-gray-800 p-4 rounded opacity-50">
              <p className="text-gray-400 text-sm">Appreciation</p>
              <p className="text-xs text-gray-500">Coming Soon</p>
            </div>

            <div className="bg-gray-800 p-4 rounded opacity-50">
              <p className="text-gray-400 text-sm">Subscribe</p>
              <p className="text-xs text-gray-500">Coming Soon</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Chat</h2>
        <div className="bg-gray-900 rounded-lg overflow-hidden flex flex-col h-96">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">No messages</p>
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
              className="flex-1 bg-gray-800 text-white rounded px-3 py-2 text-sm focus:outline-none"
            />
            <button type="submit" className="bg-yellow-300 text-black px-4 rounded font-bold">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}