'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Video {
  id: string
  title: string
  url: string
  duration?: number
}

export default function EditStationPage({ params }: { params: { id: string } }) {
  const [videos, setVideos] = useState<Video[]>([])
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [duration, setDuration] = useState('600')
  const [draggedId, setDraggedId] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(`station-${params.id}-videos`)
    if (saved) {
      setVideos(JSON.parse(saved))
    }
  }, [params.id])

  const addVideo = () => {
    if (!youtubeUrl.trim()) return

    const videoId = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)?.[1]
    if (!videoId) {
      alert('Invalid YouTube URL')
      return
    }

    const newVideo: Video = {
      id: Date.now().toString(),
      title: `Video ${videos.length + 1}`,
      url: youtubeUrl,
      duration: parseInt(duration) || 600,
    }

    const updated = [...videos, newVideo]
    setVideos(updated)
    localStorage.setItem(`station-${params.id}-videos`, JSON.stringify(updated))
    setYoutubeUrl('')
    setDuration('600')
  }

  const removeVideo = (id: string) => {
    const updated = videos.filter(v => v.id !== id)
    setVideos(updated)
    localStorage.setItem(`station-${params.id}-videos`, JSON.stringify(updated))
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const updated = [...videos]
    ;[updated[index], updated[index - 1]] = [updated[index - 1], updated[index]]
    setVideos(updated)
    localStorage.setItem(`station-${params.id}-videos`, JSON.stringify(updated))
  }

  const moveDown = (index: number) => {
    if (index === videos.length - 1) return
    const updated = [...videos]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    setVideos(updated)
    localStorage.setItem(`station-${params.id}-videos`, JSON.stringify(updated))
  }

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return

    const draggedIndex = videos.findIndex(v => v.id === draggedId)
    const targetIndex = videos.findIndex(v => v.id === targetId)

    const updated = [...videos]
    const [removed] = updated.splice(draggedIndex, 1)
    updated.splice(targetIndex, 0, removed)

    setVideos(updated)
    localStorage.setItem(`station-${params.id}-videos`, JSON.stringify(updated))
    setDraggedId(null)
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href={`/stations/${params.id}`} className="text-gray-400 mb-8 inline-block hover:text-white">
          ← Back to Station
        </Link>

        <h1 className="text-4xl font-bold mb-8">Edit Rotation</h1>

        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Add Video</h2>
          <div className="space-y-3">
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Paste YouTube URL"
              className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration (seconds)"
                className="flex-1 bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                onClick={addVideo}
                className="px-6 py-2 bg-yellow-300 text-black rounded font-bold hover:bg-yellow-400"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-gray-400">Most YouTube videos are 600 seconds (10 min) or longer</p>
          </div>
        </div>

        {videos.length > 0 ? (
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Rotation Queue ({videos.length})</h2>
            <div className="space-y-2">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  draggable
                  onDragStart={() => handleDragStart(video.id)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(video.id)}
                  className={`bg-gray-800 p-4 rounded flex items-center justify-between cursor-move hover:bg-gray-700 ${
                    draggedId === video.id ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold">{index + 1}. {video.title}</p>
                    <p className="text-xs text-gray-400 truncate">{video.url}</p>
                    <p className="text-xs text-gray-500">{video.duration}s</p>
                  </div>
                  <div className="flex gap-1 ml-4">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="px-2 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded text-sm"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === videos.length - 1}
                      className="px-2 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded text-sm"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeVideo(video.id)}
                      className="px-2 py-1 bg-red-900 hover:bg-red-800 rounded text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">💡 Drag to reorder. Videos loop forever.</p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
            Add videos to create your 24/7 rotation
          </div>
        )}
      </div>
    </div>
  )
}