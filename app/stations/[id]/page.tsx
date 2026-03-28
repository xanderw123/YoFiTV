'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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

  useEffect(() => {
    const isSignedIn = localStorage.getItem('beta_token')
    if (!isSignedIn) {
      window.location.href = '/'
      return
    }

    // Mock station data
    setStation({
      id: params.id,
      name: `Station ${params.id}`,
      description: 'A great station to watch',
    })
  }, [params.id])

  const handleSendMessage = (e: React.FormEvent) => {
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
        {/* Header */}
        <Link href="/stations" className="text-gray-400 hover:text-white mb-8 inline-block">
          ← Back to Stations
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{station.name}</h1>
          <p className="text-gray-400">{station.description}</p>
        </div>

        {/* Player & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Player */}
          <div className="lg:col-span-2">
            <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">▶</div>
                <p className="text-gray-400">Player coming soon</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`w-full py-3 rounded-lg font-bold transition ${
                isFollowing
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {isFollowing ? '✓ Following' : '+ Follow'}
            </button>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">0</div>
              <p className="text-gray-400 text-sm">Followers</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 opacity-50 cursor-not-allowed">
              <div className="text-2xl font-bold text-gray-400">💚</div>
              <p className="text-gray-400 text-sm">Appreciation</p>
              <p className="text-xs text-gray-500 mt-2">Coming Soon</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 opacity-50 cursor-not-allowed">
              <div className="text-2xl font-bold text-gray-400">🔔</div>
              <p className="text-gray-400 text-sm">Subscribe</p>
              <p className="text-xs text-gray-500 mt-2">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Chat</h2>
          <div className="bg-gray-900 rounded-lg overflow-hidden flex flex-col h-96">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No messages yet</p>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className="text-sm text-gray-300">
                    <span className="text-gray-500">You: </span>
                    {msg}
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-800 p-4 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say something..."
                className="flex-1 bg-gray-800 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:bg-yellow-300"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}