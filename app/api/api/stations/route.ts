import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '20'
    const offset = searchParams.get('offset') || '0'

    const { data: stations, error } = await supabase
      .from('stations')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1)

    if (error) throw error

    return NextResponse.json({ success: true, stations, total: stations?.length || 0 })
  } catch (error) {
    console.error('Error fetching stations:', error)
    return NextResponse.json({ error: 'Failed to fetch stations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, creator_id } = body

    if (!name || !creator_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data: station, error } = await supabase
      .from('stations')
      .insert([{ creator_id, name, description, logo_type: 'yofi_default', primary_color: '#000000', secondary_color: '#00FF00', is_active: true }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, station }, { status: 201 })
  } catch (error) {
    console.error('Error creating station:', error)
    return NextResponse.json({ error: 'Failed to create station' }, { status: 500 })
  }
}