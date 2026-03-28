export interface StationSession {
  stationId: string
  stationName: string
}

export function getCurrentStationSession(): StationSession | null {
  if (typeof window === 'undefined') return null
  const session = localStorage.getItem('station_session')
  return session ? JSON.parse(session) : null
}

export function createStationSession(stationId: string, stationName: string) {
  const session: StationSession = { stationId, stationName }
  localStorage.setItem('station_session', JSON.stringify(session))
}

export function clearStationSession() {
  localStorage.removeItem('station_session')
}

export function isStationOwner(stationId: string): boolean {
  const session = getCurrentStationSession()
  return session?.stationId === stationId
}