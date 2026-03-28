'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { formatTime } from '@/lib/rotation'

interface Video {
  id: string
  title: string
  duration: number
}

interface Station {
  id: string
  name: string
}

interface GridCell {
  videoTitle: string
  startTime: Date
}

export default function GuidePage() {
  const [stations, setStations] = useState<Station[]>([])
  const [gridData, setGridData] = useState<Map<string, GridCell[]>>(new Map())
  const [currentTime, setCurrentTime] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [timeBlocks, setTimeBlocks] = useState<Date[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('stations')
      if (saved) {
        const parsed = JSON.parse(saved)
        setStations(Array.isArray(parsed) ? parsed : [])
      }
    } catch (err) {
      console.error('Error loading stations:', err)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (stations.length === 0) return

    const generateGrid = () => {
      const blockDurationSeconds = 30 * 60
      const newGridData = new Map<string, GridCell[]>()
      const newTimeBlocks: Date[] = []

      let blockStart = new Date(currentTime)
      blockStart.setMinutes(Math.floor(blockStart.getMinutes() / 30) * 30)
      blockStart.setSeconds(0)

      for (let i = 0; i < 8; i++) {
        newTimeBlocks.push(new Date(blockStart))
        blockStart.setMinutes(blockStart.getMinutes() + 30)
      }

      stations.forEach((station) => {
        const stationGrid: GridCell[] = []
        const videosSaved = localStorage.getItem(`station-${station.id}-videos`)
        const videos: Video[] = videosSaved ? JSON.parse(videosSaved) : []

        if (videos.length === 0) {
          for (let i = 0; i < 8; i++) {
            stationGrid.push({
              videoTitle: 'No videos',
              startTime: newTimeBlocks[i],
            })
          }
          newGridData.set(station.id, stationGrid)
          return
        }

        const totalDuration = videos.reduce((sum, v) => sum + (v.duration || 600), 0)

        newTimeBlocks.forEach((blockTime) => {
          const blockSeconds = Math.floor(blockTime.getTime() / 1000)
          const positionInRotation = blockSeconds % totalDuration

          let elapsed = 0
          let currentVideoTitle = 'Unknown'

          for (let i = 0; i < videos.length; i++) {
            const videoDuration = videos[i].duration || 600
            if (positionInRotation < elapsed + videoDuration) {
              currentVideoTitle = videos[i].title
              break
            }
            elapsed += videoDuration
          }

          stationGrid.push({
            videoTitle: currentVideoTitle,
            startTime: blockTime,
          })
        })

        newGridData.set(station.id, stationGrid)
      })

      setGridData(newGridData)
      setTimeBlocks(newTimeBlocks)
    }

    generateGrid()
  }, [stations, currentTime])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading guide...</p>
      </div>
    )
  }

  if (stations.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Station Guide</h1>
          <p className="text-gray-400 mb-8">No stations yet. Create one to get started!</p>
          <Link href="/create" className="inline-block px-8 py-3 bg-yofi-green text-black rounded-lg font-bold hover:opacity-90">
            Create Your Station
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-full">
        <div className="mb-8 flex items-center justify-between px-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Station Guide</h1>
            <p className="text-gray-400">What's on now and next</p>
          </div>
          <Link href="/stations" className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
            Browse Stations
          </Link>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="flex border-b border-gray-700 sticky top-0">
              <div className="w-48 flex-shrink-0 bg-gray-950 border-r border-gray-700 p-4" />
              {timeBlocks.map((time, i) => (
                <div
                  key={i}
                  className="w-56 flex-shrink-0 bg-gray-900 border-r border-gray-700 p-3 text-center text-sm font-bold text-yofi-green"
                >
                  {formatTime(time)}
                </div>
              ))}
            </div>

            {stations.map((station) => {
              const stationCells = gridData.get(station.id) || []

              return (
                <div key={station.id} className="flex border-b border-gray-700">
                  <Link
                    href={`/stations/${station.id}`}
                    className="w-48 flex-shrink-0 bg-gray-950 border-r border-gray-700 p-4 hover:bg-gray-800 transition cursor-pointer"
                  >
                    <p className="font-bold text-white truncate text-sm">{station.name}</p>
                    <p className="text-xs text-gray-500">Live Now</p>
                  </Link>

                  {stationCells.map((cell, i) => {
                    const blockStart = cell.startTime.getTime()
                    const blockEnd = blockStart + 30 * 60 * 1000
                    const isNow = currentTime.getTime() >= blockStart && currentTime.getTime() < blockEnd

                    return (
                      <Link
                        key={i}
                        href={`/stations/${station.id}`}
                        className={`w-56 flex-shrink-0 border-r border-gray-700 p-3 text-xs transition cursor-pointer ${
                          isNow
                            ? 'bg-gray-800 border-l-4 border-l-yofi-green'
                            : 'bg-gray-900 hover:bg-gray-800'
                        }`}
                      >
                        <p className={`font-bold truncate ${isNow ? 'text-yofi-green' : 'text-white'}`}>
                          {cell.videoTitle}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">{formatTime(cell.startTime)}</p>
                      </Link>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 px-4 flex gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-l-4 border-l-yofi-green bg-gray-800"></div>
            <span>Now Playing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-900"></div>
            <span>Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  )
}