'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CreatePage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const isSignedIn = localStorage.getItem('beta_token')
    if (!isSignedIn) {
      window.location.href = '/'
      return
    }
  }, [])

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    // For now, just show success
    alert(`Created station: ${name}`)
    setName('')
    setDescription('')
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/stations" className="text-gray-400 hover:text-white mb-8 inline-block">
          ← Back to Stations
        </Link>

        <h1 className="text-4xl font-bold mb-2">Create Station</h1>
        <p className="text-gray-400 mb-12">Cultivate your 24/7 station</p>

        <div className="bg-gray-900 rounded-lg p-8">
          <form onSubmit={handleCreate} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Station Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Lofi Vibes"
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's your station about?"
                rows={4}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300"
            >
              Create Station
            </button>
          </form>
        </div>

        <div className="mt-12 bg-gray-900 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">Phase 2: Coming Soon</h3>
          <div className="space-y-3 text-gray-400">
            <p>✓ Video rotation editor</p>
            <p>✓ Tips & Appreciations (90/10)</p>
            <p>✓ Subscriptions (90/10)</p>
            <p>✓ Ad revenue from uploads (70/30)</p>
            <p>✓ Advanced analytics</p>
          </div>
        </div>
      </div>
    </div>
  )
}