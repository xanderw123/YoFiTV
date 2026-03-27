import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user, token } = body

    if (!user || !token) {
      return NextResponse.json({ error: 'Missing user or token' }, { status: 400 })
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('youtube_channel_id', user.sub)
      .single()

    if (existingUser) {
      return NextResponse.json({ success: true, user: existingUser, token })
    }

    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{ email: user.email, name: user.name, avatar_url: user.picture, youtube_channel_id: user.sub, youtube_channel_name: user.name }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, user: newUser, token })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
