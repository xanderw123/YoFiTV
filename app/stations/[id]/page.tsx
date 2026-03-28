'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getCurrentStationSession, isStationOwner } from '@/lib/stationAuth'
import { getRotationState, getUpcomingVideos, formatTime } from '@/lib/rotation'

interface Video {
  id: string
  title: string
  description?: string
  url: string
  duration: number
}

interface Station {
  id: string
  name: string
  description?: string
  settings?: {
    showUpNext?: boolean
    showChat?: boolean
    aboutText?: string
    logoUrl?: string
  }
}

export default function StationPage({ params }: { params: { id: string } }) {
  const session = getCurrentStationSession()
  const [station, setStation] = useState<Station | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [secondsIntoVideo, setSecondsIntoVideo] = useState(0)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [upcomingVideos, setUpcomingVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Get station from localStorage
      const saved = localStorage.getItem('stations')
      if (saved) {
        const allStations = JSON.parse(saved)
        const foundStation = allStations.find((s: Station) => s.id === params.id)
        if (foundStation) {
          setStation(foundStation)
        } else {
          setError('Station not found')
        }
      }

      // Get videos from localStorage
      const videosSaved = localStorage.getItem(`station-${params.id}-videos`)
      if (videosSaved) {
        const parsedVideos = JSON.parse(videosSaved)
        setVideos(Array.isArray(parsedVideos) ? parsedVideos : [])
      }
    } catch (err) {
      console.error('Error loading station:', err)
      setError('Failed to load station')
    } finally {
      setLoading(false)
    }
  }, [params.id])

  // Update rotation every second
  useEffect(() => {
    if (videos.length === 0) return

    const updateRotation = () => {
      try {
        const rotation = getRotationState(videos)
        setCurrentVideoIndex(rotation.currentVideoIndex)
        setSecondsIntoVideo(rotation.secondsIntoCurrentVideo)

        const upcoming = getUpcomingVideos(
          videos.map(v => ({
            id: v.id,
            title: v.title,
            duration: v.duration || 600,
          })),
          3
        )
        setUpcomingVideos(upcoming)
      } catch (err) {
        console.error('Error updating rotation:', err)
      }
    }

    updateRotation()
    const interval = setInterval(updateRotation, 1000)
    return () => clearInterval(interval)
  }, [videos])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setMessages([...messages, message])
      setMessage('')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading station...</p>
      </div>
    )
  }

  if (error || !station) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error || 'Station not found'}</p>
        <Link href="/stations" className="px-4 py-2 bg-yofi-green text-black rounded font-bold">
          Back to Stations
        </Link>
      </div>
    )
  }

  const currentVideo = videos[currentVideoIndex]
  const extractVide