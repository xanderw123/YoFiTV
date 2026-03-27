'use client'

import { useState } from 'react'

export default function DashboardPage() {
  const [stationName, setStationName] = useState('')
  const [stationDescription, setStationDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleCreateStation = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const userId = localStorage.getItem('userId')

      if (!userId) {
        setError('Please sign in first')
        setLoading(false)
        return
      }

      const res = await fetch('/api/stations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: stationName,
          description: stationDescription,
          creator_id: userId,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        setStationName('')
        setStationDescription('')
        setTimeout(() => {
          window.location.href = `/stations/${data.station.id}`
        }, 1000)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to create station')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Creator Dashboard</h1>
        <p className="text-gray-400 mb-8">Create and manage your 24/7 station</p>

        <div className="bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Create New Station</h2>

          {success ? (
            <div className="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded mb-6">
              Station created! Redirecting...
            </div>
          ) : null}

          {error ? (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleCreateStation} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Station Name</label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                placeholder="e.g., Lofi Sleep Stories"
                className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Description</label>
              <textarea
                value={stationDescription}
                onChange={(e) => setStationDescription(e.target.value)}
                placeholder="Describe your station..."
                rows={4}
                className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="bg-gray-800 rounded px-4 py-3 text-sm text-gray-400">
              <p className="font-bold mb-2">Next Steps:</p>
              <ol className="list-decimal ml-5 space-y-1">
                <li>Create your station</li>
                <li>Add YouTube videos to your rotation</li>
                <li>Customize your logo colors</li>
                <li>Share with your audience!</li>
              </ol>
            </div>

            <button
              type="submit"
              disabled={loading || !stationName}
              className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300 disabled:opacity-50 transition"
            >
              {loading ? 'Creating...' : 'Create Station'}
            </button>
          </form>
        </div>

        <div className="mt-12 bg-gray-900 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">Coming Soon</h3>
          <div className="space-y-3 text-gray-400">
            <p>✓ Rotation editor - add and manage YouTube videos</p>
            <p>✓ Analytics - track followers, tips, watch time</p>
            <p>✓ Logo customization - pick your brand colors</p>
            <p>✓ Subscription settings - set your tier price</p>
            <p>✓ Payout management - track and withdraw earnings</p>
          </div>
        </div>
      </div>
    </div>
  )
}