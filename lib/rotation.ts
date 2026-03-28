export interface RotationState {
  currentVideoIndex: number
  secondsIntoCurrentVideo: number
}

export function getRotationState(videos: Array<{ duration: number }>): RotationState {
  if (videos.length === 0) return { currentVideoIndex: 0, secondsIntoCurrentVideo: 0 }

  const totalDurationSeconds = videos.reduce((sum, v) => sum + (v.duration || 600), 0)
  const nowSeconds = Math.floor(Date.now() / 1000)
  const positionInRotation = nowSeconds % totalDurationSeconds

  let elapsed = 0
  for (let i = 0; i < videos.length; i++) {
    const videoDuration = videos[i].duration || 600
    if (positionInRotation < elapsed + videoDuration) {
      return {
        currentVideoIndex: i,
        secondsIntoCurrentVideo: positionInRotation - elapsed,
      }
    }
    elapsed += videoDuration
  }

  return { currentVideoIndex: 0, secondsIntoCurrentVideo: 0 }
}

export function getUpcomingVideos(
  videos: Array<{
    id: string
    title: string
    duration: number
  }>,
  hoursAhead: number = 4
): Array<{
  index: number
  title: string
  startTime: Date
}> {
  if (videos.length === 0) return []

  const upcoming = []
  const now = new Date()
  let currentTime = new Date(now)
  const rotation = getRotationState(videos)
  let videoIndex = rotation.currentVideoIndex

  while (currentTime.getTime() - now.getTime() < hoursAhead * 3600 * 1000) {
    const video = videos[videoIndex % videos.length]
    upcoming.push({
      index: videoIndex,
      title: video.title,
      startTime: new Date(currentTime),
    })
    currentTime.setSeconds(currentTime.getSeconds() + (video.duration || 600))
    videoIndex++
  }

  return upcoming
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}