export default function DetailedEventsList({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        No events to display
      </div>
    )
  }

  const getStatusColor = (type) => {
    switch (type) {
      case 'success':
        return 'from-green-500 to-emerald-600'
      case 'warning':
        return 'from-yellow-500 to-orange-600'
      case 'error':
        return 'from-red-500 to-pink-600'
      default:
        return 'from-blue-500 to-cyan-600'
    }
  }

  const getIconForType = (type) => {
    switch (type) {
      case 'success':
        return '✓'
      case 'warning':
        return '!'
      case 'error':
        return '✕'
      default:
        return '○'
    }
  }

  return (
    <div className="space-y-6">
      {/* Timeline View */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/50 via-purple-400/30 to-transparent"></div>

        {/* Events */}
        <div className="space-y-6">
          {events.map((event, idx) => (
            <div key={event.id} className="relative pl-20 animate-fade-in">
              {/* Timeline dot */}
              <div className={`absolute left-0 top-2 w-12 h-12 rounded-full bg-gradient-to-br ${getStatusColor(event.type)} flex items-center justify-center text-white font-bold shadow-lg`}>
                {getIconForType(event.type)}
              </div>

              {/* Event card */}
              <div className="bg-slate-700/40 border border-slate-600/50 rounded-xl p-5 hover:border-purple-500/50 transition-all hover:bg-slate-700/60">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{event.name}</h3>
                    <p className="text-slate-400 text-sm mt-1">{event.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.type === 'success' ? 'bg-green-500/20 text-green-300' :
                    event.type === 'warning' ? 'bg-yellow-500/20 text-yellow-300' :
                    event.type === 'error' ? 'bg-red-500/20 text-red-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {event.type.toUpperCase()}
                  </span>
                </div>

                {/* Event metrics */}
                <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-600/50">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs uppercase tracking-wider">Events</p>
                    <p className="text-white font-bold text-lg mt-1">{event.count}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs uppercase tracking-wider">Users</p>
                    <p className="text-white font-bold text-lg mt-1">{event.users}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs uppercase tracking-wider">Conversion</p>
                    <p className={`font-bold text-lg mt-1 ${
                      event.conversionRate >= 75 ? 'text-green-400' :
                      event.conversionRate >= 50 ? 'text-blue-400' :
                      'text-yellow-400'
                    }`}>
                      {event.conversionRate.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs uppercase tracking-wider">Time</p>
                    <p className="text-white font-bold text-lg mt-1">{new Date(event.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>

                {/* Message */}
                <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-slate-300 text-sm font-mono">{event.message}</p>
                </div>
              </div>

              {/* Step indicator */}
              <div className="absolute -left-8 top-16 text-slate-500 text-xs font-bold">
                STEP {idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="mt-8 pt-8 border-t border-slate-700">
        <h3 className="text-white font-semibold mb-4">Funnel Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/40 border border-slate-600/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-2">Entry Points</p>
            <p className="text-2xl font-bold text-white">{events[0]?.count || 0}</p>
            <p className="text-slate-500 text-xs mt-2">Users who initiated</p>
          </div>
          <div className="bg-slate-700/40 border border-slate-600/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-2">Exits</p>
            <p className="text-2xl font-bold text-white">{events[events.length - 1]?.users || 0}</p>
            <p className="text-slate-500 text-xs mt-2">Users who completed</p>
          </div>
          <div className="bg-slate-700/40 border border-slate-600/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-2">Overall Conversion</p>
            <p className="text-2xl font-bold text-green-400">
              {events.length > 0 ? (((events[events.length - 1]?.users || 0) / (events[0]?.count || 1)) * 100).toFixed(1) : 0}%
            </p>
            <p className="text-slate-500 text-xs mt-2">Entry to completion</p>
          </div>
        </div>
      </div>
    </div>
  )
}
