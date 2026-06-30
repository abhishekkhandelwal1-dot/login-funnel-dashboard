import { useState } from 'react'
import LoginEventsTable from './components/LoginEventsTable'
import LoginFunnel from './components/LoginFunnel'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch real data from Embrace API
      const response = await fetch('/api/funnel')
      if (!response.ok) throw new Error('Failed to fetch data')

      const result = await response.json()
      setData(result)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Login Events</h1>
              <p className="text-gray-500 text-sm mt-1">Real-time login funnel analysis</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                {lastUpdated && (
                  <p className="text-gray-600 text-sm">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </p>
                )}
              </div>
              <button
                onClick={fetchData}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-1">Click "Refresh" to try again</p>
          </div>
        )}

        {!data && !loading && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-6">Click the "Refresh" button to load login events</p>
            <button
              onClick={fetchData}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Load Data
            </button>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading data from Embrace...</p>
            </div>
          </div>
        )}

        {data && (
          <>
            {/* Login Funnel */}
            <div className="mb-10">
              <LoginFunnel data={data.funnel} />
            </div>

            {/* Events Table */}
            <div>
              <LoginEventsTable events={data.events} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
