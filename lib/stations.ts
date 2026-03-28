export interface StationSettings {
  showUpNext: boolean
  showChat: boolean
  aboutText?: string
  logoUrl?: string
}

export interface Station {
  id: string
  name: string
  description?: string
  settings: StationSettings
  createdAt: string
}

export interface Video {
  id: string
  title: string
  description?: string
  url: string
  duration: number
}

export function getStations(): Station[] {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('stations')
  return saved ? JSON.parse(saved) : []
}

export function getStation(id: string): Station | null {
  const stations = getStations()
  return stations.find(s => s.id === id) || null
}

export function createStation(name: string, description: string): Station {
  const station: Station = {
    id: Date.now().toString(),
    name,
    description,
    settings: {
      showUpNext: true,
      showChat: true,
      aboutText: '',
    },
    createdAt: new Date().toISOString(),
  }
  
  const stations = getStations()
  stations.push(station)
  localStorage.setItem('stations', JSON.stringify(stations))
  
  return station
}

export function updateStation(id: string, updates: Partial<Station>) {
  const stations = getStations()
  const index = stations.findIndex(s => s.id === id)
  
  if (index !== -1) {
    stations[index] = { ...stations[index], ...updates }
    localStorage.setItem('stations', JSON.stringify(stations))
  }
}

export function getStationVideos(stationId: string): Video[] {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem(`station-${stationId}-videos`)
  return saved ? JSON.parse(saved) : []
}

export function saveStationVideos(stationId: string, videos: Video[]) {
  localStorage.setItem(`station-${stationId}-videos`, JSON.stringify(videos))
}