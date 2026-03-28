'use client'

import Link from 'next/link'
import { getCurrentStationSession } from '@/lib/stationAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SettingsPage() {
  const router = useRouter()
  const session = getCurrentStationSession()

  useEffect(() => {
    if (!session) {
      router.push('/')
    }
  }, [session, router])

  if (!session) return null

  return (
    <div className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Account Settings */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Account</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Station Name</p>
                <p className="text-lg font-bold">{session.stationName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Station ID</p>
                <p className="text-sm font-mono text-gray-500">{session.stationId}</p>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Preferences</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm">Email notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm">Marketing emails</span>
              </label>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-400">Coming Soon</h2>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Theme customization</li>
              <li>• Privacy settings</li>
              <li>• Two-factor authentication</li>
              <li>• Account deletion</li>
            </ul>
          </div>
        </div>

        <Link href="/mystation" className="inline-block mt-8 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
          Back to My Station
        </Link>
      </div>
    </div>
  )
}