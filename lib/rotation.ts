export function getCurrentRotationPosition(totalDurationSeconds: number): number {
  if (totalDurationSeconds === 0) return 0
  const nowSeconds = Math.floor(Date.now() / 1000)
  return nowSeconds % totalDurationSeconds
}

export function calculateTotalDuration(videos: Array<{ duration_seconds: number }>): number {
  return videos.reduce((sum, v) => sum + (v.duration_seconds || 0), 0)
}

export function findCurrentVideo(
  videos: Array<{
    id: string
    duration_seconds: number
    youtube_video_id: string
    title: string
    thumbnail_url: string
  }>,
  currentPosition: number
): {
  videoId: string
  youtubeVideoId: string
  position: number
  title: string
  thumbnail: string
} {
  let position = 0

  for (const video of videos) {
    const videoDuration = video.duration_seconds || 0
    if (currentPosition < position + videoDuration) {
      return {
        videoId: video.id,
        youtubeVideoId: video.youtube_video_id,
        position: currentPosition - position,
        title: video.title,
        thumbnail: video.thumbnail_url,
      }
    }
    position += videoDuration
  }

  const firstVideo = videos[0]
  return {
    videoId: firstVideo.id,
    youtubeVideoId: firstVideo.youtube_video_id,
    position: currentPosition % (firstVideo.duration_seconds || 1),
    title: firstVideo.title,
    thumbnail: firstVideo.thumbnail_url,
  }
}