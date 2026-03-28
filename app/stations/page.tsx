'use client'

import Link from 'next/link'

export default function StationsPage() {
  const stations = [
    { id: '1', name: 'Lofi Vibes' },
    { id: '2', name: 'Synthwave' },
    { id: '3', name: 'Jazz' },
  ]

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Stations</h1>
        <div className="grid grid-cols-3 gap-6">
          {stations.map((s) => (
            <Link key={s.id} href={`/stations/${s.id}`}>
              <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 cursor-pointer">
                <h2 className="text-2xl font-bold">{s.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}