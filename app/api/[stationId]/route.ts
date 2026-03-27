import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest, { params }: { params: { stationId: string } }) {
  try {
    const { data: station, error } = await supabase
      .from('stations')
      .select('*')
      .eq('id', params.stationId)
      .single()

    if (error) throw error
    if (!station) {
      return NextResponse.json({ error: 'Station not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, station })
  } catch (error) {
    console.error('Error fetching station:', error)
    return NextResponse.json({ error: 'Failed to fetch station' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { stationId: string } }) {
  try {
    const body = await request.json()
    const { data: station, error } = await supabase
      .from('stations')
      .update(body)
      .eq('id', params.stationId)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, station })
  } catch (error) {
    console.error('Error updating station:', error)
    return NextResponse.json({ error: 'Failed to update station' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { stationId: string } }) {
  try {
    const { error } = await supabase
      .from('stations')
      .update({ is_active: false })
      .eq('id', params.stationId)

    if (error) throw error
    return NextResponse.json({ success: true, message: 'Station deleted' })
  } catch (error) {
    console.error('Error deleting station:', error)
    return NextResponse.json({ error: 'Failed to delete station' }, { status: 500 })
  }
}