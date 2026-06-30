import { useState, useEffect } from 'react'
import FunnelVisualization from './components/FunnelVisualization'
import MetricsCard from './components/MetricsCard'
import EventsTable from './components/EventsTable'
import DetailedEventsList from './components/DetailedEventsList'
import { fetchFunnelData } from './api/embrace'

// Enhanced mock data with iOS and Android
function getEnhancedMockData() {
  const iosData = {
    name: 'AUS Consumer iOS',
    appId: 'cPBea',
    platform: 'iOS',
    funnel: [
      {
        step: 1,
        name: 'Login Initiated',
        description: 'Users started login process',
        users: 12,
        events: 178,
        dropoff: 0,
        dropoffRate: 0,
        avgTimeToComplete: '0.5s',
        conversionRate: 100,
        color: '#3B82F6'
      },
      {
        step: 2,
        name: 'Login Screen',
        description: 'Login UI displayed to user',
        users: 10,
        events: 27,
        dropoff: 2,
        dropoffRate: 16.7,
        avgTimeToComplete: '2.1s',
        conversionRate: 83.3,
        color: '#10B981'
      },
      {
        step: 3,
        name: 'Credentials Entered',
        description: 'User entered login credentials',
        users: 10,
        events: 49,
        dropoff: 0,
        dropoffRate: 0,
        avgTimeToComplete: '8.3s',
        conversionRate: 100,
        color: '#F59E0B'
      },
      {
        step: 4,
        name: 'Authentication',
        description: 'Server authenticating user',
        users: 7,
        events: 20,
        dropoff: 3,
        dropoffRate: 30.0,
        avgTimeToComplete: '1.2s',
        conversionRate: 70.0,
        color: '#8B5CF6'
      },
      {
        step: 5,
        name: '2FA Verified',
        description: 'Two-factor authentication complete',
        users: 2,
        events: 2,
        dropoff: 5,
        dropoffRate: 71.4,
        avgTimeToComplete: '0.8s',
        conversionRate: 28.6,
        color: '#EC4899'
      }
    ],
    events: [
      {
        id: 1,
        name: 'Login Action Initiated',
        message: 'login_actions',
        count: 178,
        users: 12,
        conversionRate: 100,
        type: 'info',
        timestamp: '2026-06-30T08:00:00Z',
        description: 'User tapped login button'
      },
      {
        id: 2,
        name: 'Login Screen Displayed',
        message: 'login',
        count: 27,
        users: 10,
        conversionRate: 83.3,
        type: 'success',
        timestamp: '2026-06-30T08:01:00Z',
        description: 'Login UI rendered successfully'
      },
      {
        id: 3,
        name: 'Login Form Closed',
        message: 'login_close',
        count: 49,
        users: 10,
        conversionRate: 100,
        type: 'warning',
        timestamp: '2026-06-30T08:05:00Z',
        description: 'User closed login screen'
      },
      {
        id: 4,
        name: 'Authentication Success',
        message: 'Login success',
        count: 20,
        users: 7,
        conversionRate: 70.0,
        type: 'success',
        timestamp: '2026-06-30T08:10:00Z',
        description: 'User successfully authenticated'
      },
      {
        id: 5,
        name: '2FA Verification Closed',
        message: 'login_verify_close',
        count: 2,
        users: 2,
        conversionRate: 28.6,
        type: 'info',
        timestamp: '2026-06-30T08:15:00Z',
        description: 'Two-factor verification completed'
      }
    ],
    metrics: {
      totalUsers: 12,
      totalEvents: 276,
      successRate: 58.3,
      conversionRate: 41.7,
      dropoffRate: 41.7,
      avgTimePerUser: '12.9s',
      completionTime: '2-3 minutes',
      timeRange: 'Last 7 days'
    }
  }

  const androidData = {
    name: 'AUS Consumer Android',
    appId: 'hNH8N',
    platform: 'Android',
    funnel: [
      {
        step: 1,
        name: 'Login Initiated',
        description: 'Users started login process',
        users: 8,
        events: 145,
        dropoff: 0,
        dropoffRate: 0,
        avgTimeToComplete: '0.4s',
        conversionRate: 100,
        color: '#3B82F6'
      },
      {
        step: 2,
        name: 'Google Sign-In',
        description: 'Google authentication popup shown',
        users: 6,
        events: 15,
        dropoff: 2,
        dropoffRate: 25.0,
        avgTimeToComplete: '1.8s',
        conversionRate: 75.0,
        color: '#10B981'
      },
      {
        step: 3,
        name: 'Permission Check',
        description: 'Checking user permissions',
        users: 6,
        events: 18,
        dropoff: 0,
        dropoffRate: 0,
        avgTimeToComplete: '0.9s',
        conversionRate: 100,
        color: '#F59E0B'
      },
      {
        step: 4,
        name: 'Session Created',
        description: 'Session token generated',
        users: 5,
        events: 12,
        dropoff: 1,
        dropoffRate: 16.7,
        conversionRate: 83.3,
        avgTimeToComplete: '0.6s',
        color: '#8B5CF6'
      },
      {
        step: 5,
        name: 'Home Screen',
        description: 'User redirected to home',
        users: 4,
        events: 4,
        dropoff: 1,
        dropoffRate: 20.0,
        conversionRate: 80.0,
        avgTimeToComplete: '1.2s',
        color: '#EC4899'
      }
    ],
    events: [
      {
        id: 1,
        name: 'App Launch',
        message: 'app_launch',
        count: 145,
        users: 8,
        conversionRate: 100,
        type: 'info',
        timestamp: '2026-06-30T07:45:00Z',
        description: 'Application started'
      },
      {
        id: 2,
        name: 'Google Sign-In Button Tapped',
        message: 'signin_google_tap',
        count: 15,
        users: 6,
        conversionRate: 75.0,
        type: 'success',
        timestamp: '2026-06-30T07:50:00Z',
        description: 'User initiated Google authentication'
      },
      {
        id: 3,
        name: 'Permissions Verified',
        message: 'permissions_check',
        count: 18,
        users: 6,
        conversionRate: 100,
        type: 'success',
        timestamp: '2026-06-30T07:52:00Z',
        description: 'App permissions validated'
      },
      {
        id: 4,
        name: 'Session Established',
        message: 'session_created',
        count: 12,
        users: 5,
        conversionRate: 83.3,
        type: 'success',
        timestamp: '2026-06-30T07:55:00Z',
        description: 'User session initialized'
      },
      {
        id: 5,
        name: 'Home Screen Loaded',
        message: 'home_loaded',
        count: 4,
        users: 4,
        conversionRate: 80.0,
        type: 'success',
        timestamp: '2026-06-30T08:00:00Z',
        description: 'Home screen rendered'
      }
    ],
    metrics: {
      totalUsers: 8,
      totalEvents: 194,
      successRate: 50.0,
      conversionRate: 41.7,
      dropoffRate: 50.0,
      avgTimePerUser: '4.9s',
      completionTime: '1-2 minutes',
      timeRange: 'Last 7 days'
    }
  }

  return {
    ios: iosData,
    android: androidData
  }
}

export default function App() {
  const [allData, setAllData] = useState(null)
  const [selectedPlatform, setSelectedPlatform] = useState('ios')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)

  const loadData = async () => {
    try {
      setLoading(true)
      const data = await fetchFunnelData()
      setAllData(data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      console.error('Error fetching funnel data:', err)
      setAllData(getEnhancedMockData())
      setError(null)
      setLastUpdated(new Date())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Load mock data immediately
    setAllData(getEnhancedMockData())
    setLastUpdated(new Date())
    setLoading(false)

    // Try to fetch real data in background
    fetchFunnelData()
      .then(data => {
        setAllData(data)
        setLastUpdated(new Date())
      })
      .catch(err => {
        console.log('Using mock data - API not available')
      })
  }, [])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      loadData()
    }, 60000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const currentData = allData?.[selectedPlatform]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-full mx-auto px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Login Funnel Analytics
              </h1>
              <p className="text-slate-400 text-sm mt-2">Real-time conversion tracking from Embrace</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right bg-slate-800/50 rounded-lg px-4 py-3">
                <p className="text-slate-300 text-sm font-medium">
                  {autoRefresh ? '🔄 Live' : '⏸️ Paused'}
                </p>
                <p className="text-slate-500 text-xs">
                  {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  autoRefresh
                    ? 'bg-green-500/30 text-green-300 border border-green-500/50 hover:bg-green-500/40'
                    : 'bg-slate-700/30 text-slate-300 border border-slate-600/50 hover:bg-slate-700/40'
                }`}
              >
                {autoRefresh ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={loadData}
                disabled={loading}
                className="px-4 py-2 bg-purple-500/30 text-purple-300 border border-purple-500/50 hover:bg-purple-500/40 rounded-lg font-medium transition-all disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Refresh'}
              </button>
            </div>
          </div>

          {/* Platform Tabs */}
          <div className="flex gap-2">
            {['ios', 'android'].map(platform => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all border ${
                  selectedPlatform === platform
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400/50'
                    : 'bg-slate-800/50 text-slate-300 border-slate-700/50 hover:border-slate-600/50'
                }`}
              >
                {platform === 'ios' ? '🍎 iOS' : '🤖 Android'}
                <span className="ml-2 text-sm">({allData?.[platform]?.metrics.totalUsers} users)</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto px-8 py-8">
        {loading && !allData ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-slate-300">Loading funnel data...</p>
            </div>
          </div>
        ) : currentData ? (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <MetricsCard
                title="Total Users"
                value={currentData.metrics.totalUsers}
                subtext="users"
                icon="👥"
              />
              <MetricsCard
                title="Total Events"
                value={currentData.metrics.totalEvents}
                subtext="events"
                icon="📊"
              />
              <MetricsCard
                title="Success Rate"
                value={`${currentData.metrics.successRate.toFixed(1)}%`}
                subtext="completed"
                icon="✅"
                highlight={currentData.metrics.successRate > 50}
              />
              <MetricsCard
                title="Dropoff Rate"
                value={`${currentData.metrics.dropoffRate.toFixed(1)}%`}
                subtext="abandoned"
                icon="📉"
                highlight={currentData.metrics.dropoffRate < 40}
              />
              <MetricsCard
                title="Avg Time"
                value={currentData.metrics.avgTimePerUser}
                subtext="per user"
                icon="⏱️"
              />
            </div>

            {/* Funnel Visualization */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 mb-8 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Login Conversion Funnel</h2>
                <p className="text-slate-400 text-sm">{currentData.name} - {currentData.metrics.timeRange}</p>
              </div>
              <FunnelVisualization data={currentData.funnel} />
            </div>

            {/* Detailed Events */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 mb-8 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Login Events Timeline</h2>
                <p className="text-slate-400 text-sm">Detailed event tracking and progression</p>
              </div>
              <DetailedEventsList events={currentData.events} />
            </div>

            {/* Events Summary Table */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Events Summary</h2>
                <p className="text-slate-400 text-sm">Performance metrics by event</p>
              </div>
              <EventsTable events={currentData.events} />
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-slate-400">
            <p>No data available</p>
          </div>
        )}
      </main>
    </div>
  )
}
