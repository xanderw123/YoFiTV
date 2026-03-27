import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest, { params }: { params: { stationId: string } }) {
  try {
    const { data: tips, error } = await supabase
      .from('tips')
      .select('*')
      .eq('station_id', params.stationId)
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error

    const totalTips = tips?.reduce((sum, tip) => sum + tip.amount_cents, 0) || 0

    return NextResponse.json({
      success: true,
      tips,
      total_tips_cents: totalTips,
      total_tips_dollars: totalTips / 100,
    })
  } catch (error) {
    console.error('Error fetching tips:', error)
    return NextResponse.json({ error: 'Failed to fetch tips' }, { status: 500 })
  }
}