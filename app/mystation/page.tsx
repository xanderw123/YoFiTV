'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getStation, updateStation, getStationVideos, saveStationVideos, Station, Video, deleteStation } from '@/lib/stations'
import { getCurrentStationSession, clearStationSession } from '@/lib/stationAuth'

export default function MyStationPage() {
  const router = useRouter()
  const session = getCurrentStationSession()
  const [station, setStation] = useState<Station | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [aboutText, setAboutText] = useState('')
  const [showUpNext, setShowUpNext] = useState(true)
  const [showChat, setShowChat] = useState(true)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')
  const [addingVideo, setAddingVideo] = useState(false)
  const [stationName, setStationName] = useState('')
  const [stationDescription, setStationDescription] = useState('')

  useEffect(() => {
    if (!session) {
      router.push('/')
      return
    }

    const stationData = getStation(session.stationId)
    if (!stationData) {
      router.push('/')
      return
    }

    setStation(stationData)
    setStationName(stationData.name)
    setStationDescription(stationData.description || '')
    setAboutText(stationData.settings.aboutText || '')
    setShowUpNext(stationData.settings.showUpNext)
    setShowChat(stationData.settings.showChat)
    if (stationData.settings.logoUrl) {
      setLogoPreview(stationData.settings.logoUrl)
    }

    const videosData = getStationVideos(session.stationId)
    setVideos(videosData)
    setLoading(false)
  }, [session, router])

  const handleLogout = () => {
    clearStationSession()
    router.push('/')
  }

  const handleDelete = () => {
    const confirm = window.confirm(
      `Are you sure you want to delete "${station?.name}"? This cannot be undone.`
    )
    if (confirm) {
      deleteStation(session!.stationId)
      clearStationSession()
      router.push('/')
    }
  }

  const extractVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
    return match ? match[1] : null
  }

  const addVideo = async () => {
    if (!youtubeUrl.trim() || !session) return

    const videoId = extractVideoId(youtubeUrl)
    if (!videoId) {
      alert('Invalid YouTube URL')
      return
    }

    setAddingVideo(true)

    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=https://youtube.com/watch?v=${videoId}&format=json`
      )
      const data = await res.json()

      const newVideo: Video = {
        id: Date.now().toString(),
        title: data.title || 'Untitled Video',
        description: '',
        url: youtubeUrl,
        duration: 600,
      }

      const updated = [...videos, newVideo]
      setVideos(updated)
      saveStationVideos(session.stationId, updated)
      setYoutubeUrl('')
    } catch (err) {
      alert('Could not fetch video. Make sure the URL is valid.')
    } finally {
      setAddingVideo(false)
    }
  }

  const updateVideo = (id: string, title: string, description: string) => {
    if (!session) return
    const updated = videos.map(v =>
      v.id === id ? { ...v, title, description } : v
    )
    setVideos(updated)
    saveStationVideos(session.stationId, updated)
    setEditingVideoId(null)
  }

  const removeVideo = (id: string) => {
    if (!session) return
    const updated = videos.filter(v => v.id !== id)
    setVideos(updated)
    saveStationVideos(session.stationId, updated)
  }

  const moveUp = (index: number) => {
    if (!session || index === 0) return
    const updated = [...videos]
    ;[updated[index], updated[index - 1]] = [updated[index - 1], updated[index]]
    setVideos(updated)
    saveStationVideos(session.stationId, updated)
  }

  const moveDown = (index: number) => {
    if (!session || index === videos.length - 1) return
    const updated = [...videos]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    setVideos(updated)
    saveStationVideos(session.stationId, updated)
  }

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId || !session) return

    const draggedIndex = videos.findIndex(v => v.id === draggedId)
    const targetIndex = videos.findIndex(v => v.id === targetId)

    const updated = [...videos]
    const [removed] = updated.splice(draggedIndex, 1)
    updated.splice(targetIndex, 0, removed)

    setVideos(updated)
    saveStationVideos(session.stationId, updated)
    setDraggedId(null)
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setLogoPreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const saveSettings = () => {
    if (!station || !session) return

    let logoUrl = station.settings.logoUrl
    if (logoPreview && logoPreview.startsWith('data:')) {
      logoUrl = logoPreview
    }

    updateStation(session.stationId, {
      name: stationName,
      description: stationDescription,
      settings: {
        ...station.settings,
        aboutText,
        showUpNext,
        showChat,
        logoUrl,
      },
    })
    alert('Settings saved!')
  }

  if (loading || !station || !session) return null

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{station.name}</h1>
            <p className="text-gray-400">Manage your station</p>
          </div>
          <div className="flex gap-4">
            <Link href={`/stations/${session.stationId}`} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
              View Station
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
              Sign Out
            </button>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-900 text-red-200 rounded hover:bg-red-800">
              Delete Station
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Station Info */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Station Info</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Station Name</label>
                  <input
                    type="text"
                    value={stationName}
                    onChange={(e) => setStationName(e.target.value)}
                    className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yofi-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Description</label>
                  <textarea
                    value={stationDescription}
                    onChange={(e) => setStationDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yofi-green"
                  />
                </div>
              </div>
            </div>

            {/* Station Logo */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Station Logo</h2>
              <div className="flex gap-4 items-start">
                {logoPreview && (
                  <img src={logoPreview} alt="Station Logo" className="w-24 h-24 object-contain rounded" />
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*,.svg"
                    onChange={handleLogoChange}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yofi-green file:text-black hover:file:opacity-90"
                  />
                </div>
              </div>
            </div>

            {/* Add Videos */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Add Videos</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addVideo()}
                  placeholder="Paste YouTube URL"
                  className="flex-1 bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yofi-green"
                />
                <button
                  onClick={addVideo}
                  disabled={addingVideo}
                  className="px-6 py-2 bg-yofi-green text-black rounded font-bold hover:opacity-90 disabled:opacity-50"
                >
                  {addingVideo ? 'Adding...' : 'Add'}
                </button>
              </div>
            </div>

            {/* Videos */}
            {videos.length > 0 ? (
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Rotation ({videos.length})</h2>
                <div className="space-y-3">
                  {videos.map((video, index) => (
                    <div key={video.id}>
                      {editingVideoId === video.id ? (
                        <div className="bg-gray-800 p-4 rounded space-y-2">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none"
                          />
                          <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Description"
                            rows={2}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateVideo(video.id, editTitle, editDescription)}
                              className="px-3 py-1 bg-yofi-green text-black rounded text-sm font-bold"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingVideoId(null)}
                              className="px-3 py-1 bg-gray-700 rounded text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
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
                            {video.description && <p className="text-xs text-gray-400">{video.description}</p>}
                          </div>
                          <div className="flex gap-1 ml-4">
                            <button
                              onClick={() => {
                                setEditingVideoId(video.id)
                                setEditTitle(video.title)
                                setEditDescription(video.description || '')
                              }}
                              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                            >
                              Edit
                            </button>
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
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
                Add videos to create your rotation
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">About Your Station</h3>
              <textarea
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                placeholder="Tell viewers about your station..."
                rows={4}
                className="w-full bg-gray-800 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yofi-green"
              />
            </div>

            {/* Settings */}
            <div className="bg-gray-900 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-bold mb-3">Settings</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUpNext}
                  onChange={(e) => setShowUpNext(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Show Coming Up</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showChat}
                  onChange={(e) => setShowChat(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Enable Chat</span>
              </label>
            </div>

            <button
              onClick={saveSettings}
              className="w-full bg-yofi-green text-black font-bold py-3 rounded hover:opacity-90"
            >
              Save All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}