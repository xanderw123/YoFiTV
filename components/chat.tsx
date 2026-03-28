'use client'

import { useEffect, useState } from 'react'

interface Message {
  id: string
  content: string
  created_at: string
  user_id: string
  users?: {
    name: string
    avatar_url: string
  }
}

interface ChatProps {
  stationId: string
  userId?: string
}

export function Chat({ stationId, userId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/chat/${stationId}?limit=50`)
      const data = await res.json()

      if (data.success) {
        setMessages(data.messages)
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err)
    }
  }

  useEffect(() => {
    fetchMessages()

    const interval = setInterval(fetchMessages, 30000)
    return () => clearInterval(interval)
  }, [stationId])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !userId) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/chat/${stationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newMessage,
          user_id: userId,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setNewMessage('')
        fetchMessages()
        setError(null)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to send message')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-96 bg-gray-900 rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="text-sm">
              <div className="flex items-start gap-2">
                <div className="text-xs text-gray-500">
                  {msg.users?.name || 'Anonymous'}
                </div>
              </div>
              <div className="text-gray-200 ml-0">{msg.content}</div>
            </div>
          ))
        )}
      </div>

      {userId ? (
        <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-700">
          {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Say something..."
              maxLength={500}
              className="flex-1 bg-gray-800 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newMessage.trim()}
              className="bg-yellow-400 text-black px-3 py-2 rounded text-sm font-bold hover:bg-yellow-300 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      ) : (
        <div className="p-3 border-t border-gray-700 text-center text-gray-400 text-sm">
          Sign in to chat
        </div>
      )}
    </div>
  )
}