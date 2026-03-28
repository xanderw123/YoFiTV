export function getCurrentRotationPosition(totalDurationSeconds: number): number {
  if (totalDurationSeconds === 0) return 0
  const nowSeconds = Math.floor(Date.now() / 1000)
  return nowSeconds % totalDurationSeconds
}

export function findCurrentVideo(
  videos: Array<{
    id: string
    duration: number
    videoId: string
    title: string
  }>,
  currentPosition: number
): {
  videoId: string
  positionSeconds: number
  title: string
  index: number
} {
  let position = 0

  for (let i = 0; i < videos.length; i++) {
    const videoDuration = videos[i].duration || 600
    if (currentPosition < position + videoDuration) {
      return {
        videoId: videos[i].videoId,
        positionSeconds: currentPosition - position,
        title: videos[i].title,
        index: i,
      }
    }
    position += videoDuration
  }

  return {
    videoId: videos[0].videoId,
    positionSeconds: 0,
    title: videos[0].title,
    index: 0,
  }
}

export function calculateTotalDuration(videos: Array<{ duration: number }>): number {
  return videos.reduce((sum, v) => sum + (v.duration || 600), 0)
}