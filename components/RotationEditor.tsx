'use client'

import { useState } from 'react'

interface Video {
  id: string
  youtube_video_id: string
  title: string
  duration_seconds: number
}

interface RotationEditorProps {
  stationId: string
  onVideoAdded?: () => void
}

export function RotationEditor({ stationId, onVideoAdded }: RotationEditorProps) {
  const [videos, setVideos] = useState<Video[]>([])
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const videoId = extractVideoId(youtubeUrl)
    if (!videoId) {
      setError('Invalid YouTube URL')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=https://youtube.com/watch?v=${videoId}&format=json`
      )
      const data = await res.json()

      const newVideo: Video = {
        id: Math.random().toString(36).substring(7),
        youtube_video_id: videoId,
        title: data.title || 'Untitled Video',
        duration_seconds: 0,
      }

      setVideos([...videos, newVideo])
      setYoutubeUrl('')
      onVideoAdded?.()
    } catch (err) {
      setError('Could not fetch video info. Make sure the URL is valid.')
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return

    const draggedIndex = videos.findIndex((v) => v.id === draggedId)
    const targetIndex = videos.findIndex((v) => v.id === targetId)

    const newVideos = [...videos]
    const [removed] = newVideos.splice(draggedIndex, 1)
    newVideos.splice(targetIndex, 0, removed)

    setVideos(newVideos)
    setDraggedId(null)
  }

  const handleRemove = (id: string) => {
    setVideos(videos.filter((v) => v.id !== id))
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const newVideos = [...videos]
    ;[newVideos[index], newVideos[index - 1]] = [newVideos[index - 1], newVideos[index]]
    setVideos(newVideos)
  }

  const moveDown = (index: number) => {
    if (index === videos.length - 1) return
    const newVideos = [...videos]
    ;[newVideos[index], newVideos[index + 1]] = [newVideos[index + 1], newVideos[index]]
    setVideos(newVideos)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Add Videos to Rotation</h3>
        <form onSubmit={handleAddVideo} className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-bold mb-2">YouTube URL</label>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Video'}
          </button>
        </form>
      </div>

      {videos.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Rotation Queue ({videos.length} videos)</h3>
          <div className="space-y-2">
            {videos.map((video, index) => (
              <div
                key={video.id}
                draggable
                onDragStart={() => handleDragStart(video.id)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(video.id)}
                className={`bg-gray-800 rounded p-4 cursor-move hover:bg-gray-700 transition flex items-center justify-between ${
                  draggedId === video.id ? 'opacity-50' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="font-bold text-white">{index + 1}. {video.title}</div>
                  <div className="text-xs text-gray-400">youtube.com/watch?v={video.youtube_video_id}</div>
                </div>
                <div className="flex gap-2">
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
                    onClick={() => handleRemove(video.id)}
                    className="px-2 py-1 bg-red-900 hover:bg-red-800 rounded text-sm text-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-400">
            💡 Drag videos to reorder, or use the arrow buttons. Videos play in order, then loop.
          </div>
        </div>
      )}

      {videos.length === 0 && (
        <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
          Add YouTube videos above to create your rotation
        </div>
      )}
    </div>
  )
}