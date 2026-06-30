// Mock data generator - Replace with actual Embrace API calls
function generateMockData() {
  const events = [
    {
      name: 'Login Initiated',
      message: 'login_actions',
      count: 178,
      users: 12,
      conversion: 100,
      type: 'success'
    },
    {
      name: 'Login Screen Shown',
      message: 'login',
      count: 27,
      users: 10,
      conversion: 83.3,
      type: 'success'
    },
    {
      name: 'Login Closed',
      message: 'login_close',
      count: 49,
      users: 10,
      conversion: 100,
      type: 'warning'
    },
    {
      name: 'Login Success',
      message: 'Login success',
      count: 20,
      users: 7,
      conversion: 70.0,
      type: 'success'
    },
    {
      name: 'Verification Closed',
      message: 'login_verify_close',
      count: 2,
      users: 2,
      conversion: 28.6,
      type: 'success'
    }
  ]

  const funnel = [
    {
      name: 'Login Initiated',
      description: 'Users started login process',
      users: 12,
      conversion: 100,
      color: '#3B82F6'
    },
    {
      name: 'Login Screen',
      description: 'Login UI displayed',
      users: 10,
      conversion: 83.3,
      color: '#10B981'
    },
    {
      name: 'Screen Closed',
      description: 'Users closed login',
      users: 10,
      conversion: 100,
      color: '#F59E0B'
    },
    {
      name: 'Authenticated',
      description: 'Successful authentication',
      users: 7,
      conversion: 70.0,
      color: '#8B5CF6'
    },
    {
      name: 'Verified',
      description: '2FA verification done',
      users: 2,
      conversion: 28.6,
      color: '#EC4899'
    }
  ]

  return {
    funnel,
    events,
    metrics: {
      totalUsers: 12,
      totalEvents: 276,
      successRate: 58.3,
      conversionRate: 41.7,
      averageEventsPerUser: 23,
      timeRange: 'Last 7 days'
    },
    timestamp: new Date().toISOString(),
    apps: {
      ios: {
        name: 'AUS Consumer iOS',
        appId: 'cPBea',
        status: 'active'
      },
      android: {
        name: 'AUS Consumer Android',
        appId: 'hNH8N',
        status: 'inactive'
      }
    }
  }
}

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    // TODO: Replace with actual Embrace API integration
    // Example: Call Embrace MCP tools to fetch real data

    const data = generateMockData()

    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching funnel data:', error)
    res.status(500).json({
      error: 'Failed to fetch funnel data',
      message: error.message
    })
  }
}
