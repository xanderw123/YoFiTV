'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CreatePage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Created: ${name}`)
    setName('')
    setDescription('')
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-400 mb-8 inline-block hover:text-white">
          Back
        </Link>

        <h1 className="text-4xl font-bold mb-8">Create Station</h1>

        <form onSubmit={handleCreate} className="bg-gray-900 p-8 rounded-lg space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Station name"
              className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none"
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
              className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none"
            />
          </div>

          <button type="submit" className="w-full bg-yellow-300 text-black font-bold py-3 rounded hover:bg-yellow-400">
            Create
          </button>
        </form>

        <div className="mt-12 bg-gray-900 p-8 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Phase 2</h3>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>✓ Video rotation editor</p>
            <p>✓ Tips & Subscriptions (90/10)</p>
            <p>✓ Ad revenue (70/30)</p>
            <p>✓ Analytics dashboard</p>
          </div>
        </div>
      </div>
    </div>
  )
}