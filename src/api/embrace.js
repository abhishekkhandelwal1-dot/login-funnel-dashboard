// Fetch funnel data from the backend API
export async function fetchFunnelData() {
  try {
    const response = await fetch('/api/funnel', {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to fetch funnel data:', error)
    throw error
  }
}

// Fetch events for a specific app
export async function fetchAppEvents(appId, timeWindow = 'last_7_days') {
  try {
    const response = await fetch(`/api/events?appId=${appId}&timeWindow=${timeWindow}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to fetch events:', error)
    throw error
  }
}
