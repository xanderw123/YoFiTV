import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getCurrentRotationPosition, findCurrentVideo, calculateTotalDuration } from '@/lib/rotation'

export async function GET(request: NextRequest, { params }: { params: { stationId: string } }) {
  try {
    const stationId = params.stationId

    const { data: videos, error: videoError } = await supabase
      .from('videos')
      .select('id, duration_seconds, youtube_video_id, title, thumbnail_url')
      .eq('station_id', stationId)
      .order('rotation_order', { ascending: true })

    if (videoError) throw videoError

    if (!videos || videos.length === 0) {
      return NextResponse.json({ error: 'No videos in rotation' }, { status: 404 })
    }

    const totalDuration = calculateTotalDuration(videos)
    const currentPosition = getCurrentRotationPosition(totalDuration)
    const currentVideo = findCurrentVideo(videos, currentPosition)

    await supabase
      .from('stations')
      .update({ last_activity: new Date().toISOString() })
      .eq('id', stationId)

    return NextResponse.json({
      success: true,
      current_video_id: currentVideo.videoId,
      youtube_video_id: currentVideo.youtubeVideoId,
      position_seconds: Math.floor(currentVideo.position),
      total_duration_seconds: totalDuration,
      title: currentVideo.title,
      thumbnail: currentVideo.thumbnail,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('Error calculating rotation:', error)
    return NextResponse.json({ error: 'Failed to calculate rotation' }, { status: 500 })
  }
}
