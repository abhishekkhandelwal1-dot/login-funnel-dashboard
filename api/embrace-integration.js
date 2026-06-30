/**
 * Advanced Embrace API Integration Example
 *
 * This file demonstrates how to connect the dashboard to real Embrace data
 * using Node.js to call the Embrace MCP tools
 *
 * To use this, you'll need to:
 * 1. Install the Embrace SDK: npm install @embrace-io/embrace-sdk
 * 2. Set up Embrace API authentication in your environment
 * 3. Replace the mock data in funnel.js with calls to these functions
 */

/**
 * Fetch login events from Embrace for AUS Consumer iOS
 */
async function fetchIOSLoginEvents() {
  try {
    // Example using Embrace API (requires auth token)
    // In production, you'd use the actual Embrace API client

    const response = await fetch('https://api.embrace.io/v1/logs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.EMBRACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        appId: process.env.VITE_IOS_APP_ID,
        timeWindow: 'last_7_days',
        messageFilter: 'login',
        limit: 50
      })
    })

    if (!response.ok) {
      throw new Error(`Embrace API error: ${response.status}`)
    }

    const data = await response.json()
    return processIOSLogs(data)
  } catch (error) {
    console.error('Error fetching iOS login events:', error)
    throw error
  }
}

/**
 * Fetch login events from Embrace for AUS Consumer Android
 */
async function fetchAndroidLoginEvents() {
  try {
    const response = await fetch('https://api.embrace.io/v1/logs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.EMBRACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        appId: process.env.VITE_ANDROID_APP_ID,
        timeWindow: 'last_7_days',
        messageFilter: 'login',
        limit: 50
      })
    })

    if (!response.ok) {
      throw new Error(`Embrace API error: ${response.status}`)
    }

    const data = await response.json()
    return processAndroidLogs(data)
  } catch (error) {
    console.error('Error fetching Android login events:', error)
    throw error
  }
}

/**
 * Process iOS Embrace logs into funnel format
 * Expected Embrace response format:
 * {
 *   items: [
 *     {
 *       message: "login_actions",
 *       count: 178,
 *       unique_users: 12,
 *       affected_user_pct: 0.12,
 *       type: "info"
 *     }
 *   ]
 * }
 */
function processIOSLogs(embraceData) {
  if (!embraceData.items || embraceData.items.length === 0) {
    return null
  }

  // Map Embrace events to funnel steps
  const eventMap = {
    'login_actions': {
      step: 1,
      name: 'Login Initiated',
      description: 'Users started login process'
    },
    'login': {
      step: 2,
      name: 'Login Screen',
      description: 'Login UI displayed'
    },
    'login_close': {
      step: 3,
      name: 'Screen Closed',
      description: 'Users closed login'
    },
    'Login success': {
      step: 4,
      name: 'Authenticated',
      description: 'Successful authentication'
    },
    'login_verify_close': {
      step: 5,
      name: 'Verified',
      description: '2FA verification done'
    }
  }

  // Create funnel structure
  const funnel = []
  let previousUsers = null

  for (const item of embraceData.items) {
    const mapping = eventMap[item.message]
    if (!mapping) continue

    const users = item.unique_users
    const conversion = previousUsers
      ? (users / previousUsers) * 100
      : 100

    funnel.push({
      name: mapping.name,
      description: mapping.description,
      users: users,
      conversion: conversion,
      step: mapping.step
    })

    previousUsers = users
  }

  return funnel.sort((a, b) => a.step - b.step)
}

/**
 * Process Android Embrace logs
 */
function processAndroidLogs(embraceData) {
  // Android may have different event naming or structure
  // Implement similar processing as iOS
  if (!embraceData.items || embraceData.items.length === 0) {
    return null
  }

  // Process similarly to iOS
  return processIOSLogs(embraceData)
}

/**
 * Fetch root span data for additional performance metrics
 * This could show login performance metrics like P50, P95, etc.
 */
async function fetchLoginSpans(appId) {
  try {
    const response = await fetch(
      `https://api.embrace.io/v1/spans?appId=${appId}&filter=login`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.EMBRACE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Embrace Spans API error: ${response.status}`)
    }

    const data = await response.json()
    return processSpans(data)
  } catch (error) {
    console.error('Error fetching login spans:', error)
    return null
  }
}

/**
 * Process span data into metrics
 */
function processSpans(spansData) {
  if (!spansData.items || spansData.items.length === 0) {
    return null
  }

  return {
    performance: {
      p50: spansData.items[0]?.duration_p50 || 0,
      p95: spansData.items[0]?.duration_p95 || 0,
      p99: spansData.items[0]?.duration_p99 || 0,
      failureRate: spansData.items[0]?.failure_pct || 0
    }
  }
}

/**
 * Combine iOS and Android data
 */
async function getCombinedFunnelData() {
  try {
    const [iosData, androidData] = await Promise.all([
      fetchIOSLoginEvents(),
      fetchAndroidLoginEvents()
    ])

    const totalUsers = (iosData?.length > 0 ? iosData[0].users : 0) +
                       (androidData?.length > 0 ? androidData[0].users : 0)

    const totalEvents = iosData?.reduce((sum, e) => sum + e.users, 0) || 0 +
                        androidData?.reduce((sum, e) => sum + e.users, 0) || 0

    return {
      funnel: iosData || [],
      apps: {
        ios: iosData ? 'active' : 'no_data',
        android: androidData ? 'active' : 'no_data'
      },
      metrics: {
        totalUsers,
        totalEvents,
        successRate: calculateSuccessRate(iosData),
        conversionRate: calculateConversionRate(iosData)
      }
    }
  } catch (error) {
    console.error('Error combining funnel data:', error)
    throw error
  }
}

/**
 * Calculate success rate from funnel
 */
function calculateSuccessRate(funnel) {
  if (!funnel || funnel.length === 0) return 0

  const initiated = funnel[0]?.users || 0
  const successful = funnel[funnel.length - 1]?.users || 0

  return initiated > 0 ? (successful / initiated) * 100 : 0
}

/**
 * Calculate conversion rate
 */
function calculateConversionRate(funnel) {
  if (!funnel || funnel.length < 2) return 0

  const step1 = funnel[0]?.users || 0
  const step2 = funnel[1]?.users || 0

  return step1 > 0 ? (step2 / step1) * 100 : 0
}

// Export functions for use in funnel.js
export {
  fetchIOSLoginEvents,
  fetchAndroidLoginEvents,
  getCombinedFunnelData,
  processIOSLogs,
  processAndroidLogs,
  fetchLoginSpans
}
