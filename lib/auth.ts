export function getBetaToken(): string | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get('beta')
}

export function isBetaTester(): boolean {
  if (typeof window === 'undefined') return false
  const token = getBetaToken()
  const stored = localStorage.getItem('beta_token')
  return !!(token || stored)
}

export function initBetaSession(token: string) {
  localStorage.setItem('beta_token', token)
  localStorage.setItem('user_id', `tester_${token}`)
  localStorage.setItem('user_name', `Tester ${token.substring(0, 6).toUpperCase()}`)
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null
  return {
    id: localStorage.getItem('user_id'),
    name: localStorage.getItem('user_name'),
    isBeta: isBetaTester(),
  }
}

export function logout() {
  localStorage.removeItem('beta_token')
  localStorage.removeItem('user_id')
  localStorage.removeItem('user_name')
  window.location.href = '/'
}