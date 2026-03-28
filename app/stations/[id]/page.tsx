'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function StationPage({ params }: { params: { id: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setMessages([...messages, message])
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/stations" className="text-gray-400 mb-8 inline-block hover:text-white">
          Back
        </Link>

        <h1 className="text-4xl font-bold mb-8">Station {params.id}</h1>

        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="col-span-2">
            <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Player placeholder</p>
            </div>
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