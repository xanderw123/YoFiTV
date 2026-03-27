import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest, { params }: { params: { stationId: string } }) {
  try {
    const stationId = params.stationId
    const limit = request.nextUrl.searchParams.get('limit') || '50'

    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select('id, content, created_at, user_id, users (name, avatar_url)')
      .eq('station_id', stationId)
      .eq('deleted', false)
      .order('created_at', { ascending: false })
      .limit(parseInt(limit))

    if (error) throw error

    return NextResponse.json({ success: true, messages: messages?.reverse() || [] })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { stationId: string } }) {
  try {
    const stationId = params.stationId
    const body = await request.json()
    const { content, user_id } = body

    if (!content || !user_id) {
      return NextResponse.json({ error: 'Missing content or user_id' }, { status: 400 })
    }

    if (content.length > 500) {
      return NextResponse.json({ error: 'Message too long (max 500 chars)' }, { status: 400 })
    }

    const { data: message, error } = await supabase
      .from('chat_messages')
      .insert([{ station_id: stationId, user_id, content }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, message }, { status: 201 })
  } catch (error) {
    console.error('Error posting message:', error)
    return NextResponse.json({ error: 'Failed to post message' }, { status: 500 })
  }
}
