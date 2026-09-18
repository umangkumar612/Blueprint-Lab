const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, { headers: { 'Content-Type': 'application/json' }, ...options })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.error || 'Something went wrong')
  return payload.data
}

export const api = {
  problems: () => request('/problems'),
  problem: (id) => request(`/problems/${id}`),
  attempts: () => request('/attempts'),
  attempt: (id) => request(`/attempts/${id}`),
  createAttempt: (problemId) => request('/attempts', { method: 'POST', body: JSON.stringify({ problemId }) }),
  submit: (id, submission) => request(`/attempts/${id}/submission`, { method: 'POST', body: JSON.stringify(submission) }),
  evaluate: (id) => request(`/attempts/${id}/evaluate`, { method: 'POST' }),
  evaluation: (id) => request(`/attempts/${id}/evaluation`),
  retry: (id) => request(`/evaluations/${id}/retry`, { method: 'POST' })
}
