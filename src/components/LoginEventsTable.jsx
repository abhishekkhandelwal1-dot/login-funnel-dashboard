export default function LoginEventsTable({ events }) {
  if (!events || events.length === 0) {
    return <div className="text-center py-8 text-gray-500">No events available</div>
  }

  const getStageColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100'
      case 'warning':
        return 'bg-yellow-100'
      case 'error':
        return 'bg-red-100'
      default:
        return 'bg-blue-100'
    }
  }

  const getStatusDot = (type) => {
    switch (type) {
      case 'success':
        return '🟢'
      case 'warning':
        return '🟡'
      case 'error':
        return '🔴'
      default:
        return '🔵'
    }
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return '-'
    try {
      const date = new Date(timestamp)
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
    } catch {
      return timestamp
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Login Events</h2>
        <p className="text-gray-600 text-sm mt-1">Detailed login event sequence</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Time</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Event Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Action / Label</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Events</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Users</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Stage</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, idx) => (
              <tr key={event.id || idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                  {formatTime(event.timestamp)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div>
                    <p className="font-bold text-gray-900">{event.name}</p>
                    <p className="text-gray-500 text-xs font-mono">{event.message}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {event.description || '–'}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900 font-semibold">
                  {event.count || 0}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900 font-semibold">
                  {event.users || 0}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded ${getStageColor(event.type)}`}>
                    <span className="text-lg">{getStatusDot(event.type)}</span>
                    <span className="text-sm font-semibold text-gray-700 capitalize">
                      {event.type}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Stats */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <p className="text-gray-600 text-sm mb-1">Total Events</p>
            <p className="text-2xl font-bold text-gray-900">
              {events.reduce((sum, e) => sum + (e.count || 0), 0)}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Unique Users</p>
            <p className="text-2xl font-bold text-gray-900">
              {events[0]?.users || 0}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Success Rate</p>
            <p className="text-2xl font-bold text-green-600">
              {events.length > 0
                ? (((events[events.length - 1]?.users || 0) / (events[0]?.count || 1)) * 100).toFixed(1)
                : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
