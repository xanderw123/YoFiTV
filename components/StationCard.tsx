'use client'
import Link from 'next/link'
interface StationCardProps { id: string; name: string; description?: string; primary_color: string; secondary_color: string; logo_type: string }
export function StationCard({ id, name, description, primary_color, secondary_color }: StationCardProps) {
  return (
    <Link href={`/stations/${id}`}>
      <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="aspect-square flex items-center justify-center text-4xl font-bold" style={{ backgroundColor: secondary_color, color: primary_color }}><div className="text-center"><div>▶</div><div className="text-xs mt-2">{name.charAt(0)}</div></div></div>
        <div className="p-4"><h3 className="font-bold text-white truncate">{name}</h3>{description && <p className="text-gray-400 text-sm truncate mt-1">{description}</p>}<div className="mt-3 text-xs text-gray-500">Live • Always On</div></div>
      </div>
    </Link>
  )
}
