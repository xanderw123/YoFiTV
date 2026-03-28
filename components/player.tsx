'use client'

import { useEffect, useState } from 'react'

interface PlayerProps {
  stationId: string
}

interface CurrentVideo {
  youtube_video_id: string
  position_seconds: number
  title: string
}

export function Player({ stationId }: PlayerProps) {
  const [currentVideo, setCurrentVideo] = useState<CurrentVideo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRotation = async () => {
      try {
        const res = await fetch(`/api/rotation/${stationId}`)
        const data = await res.json()

        if (!data.success) {
          setError(data.error)
          return
        }

        setCurrentVideo({
          youtube_video_id: data.youtube_video_id,
          position_seconds: data.position_seconds,
          title: data.title,
        })
        setError(null)
      } catch (err) {
        setError('Failed to load video')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRotation()
    const interval = setInterval(fetchRotation, 30000)
    return () => clearInterval(interval)
  }, [stationId])

  if (loading) {
    return (
      <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (!currentVideo) {
    return (
      <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
        <div className="text-gray-400">No video available</div>
      </div>
    )
  }

  const startSeconds = Math.max(0, currentVideo.position_seconds)

  return (
    <div className="w-full">
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${currentVideo.youtube_video_id}?start=${Math.floor(startSeconds)}&autoplay=1&controls=0&modestbranding=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={currentVideo.title}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold text-white">{currentVideo.title}</h2>
      </div>
    </div>
  )
}