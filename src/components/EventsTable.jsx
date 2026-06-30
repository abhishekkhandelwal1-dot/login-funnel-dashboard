export default function EventsTable({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        No events to display
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-600/50 bg-slate-800/30">
            <th className="text-left py-4 px-4 text-slate-300 font-bold uppercase text-xs tracking-wider">Event</th>
            <th className="text-center py-4 px-4 text-slate-300 font-bold uppercase text-xs tracking-wider">Events</th>
            <th className="text-center py-4 px-4 text-slate-300 font-bold uppercase text-xs tracking-wider">Users</th>
            <th className="text-center py-4 px-4 text-slate-300 font-bold uppercase text-xs tracking-wider">Conversion</th>
            <th className="text-center py-4 px-4 text-slate-300 font-bold uppercase text-xs tracking-wider">Rate</th>
            <th className="text-center py-4 px-4 text-slate-300 font-bold uppercase text-xs tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, idx) => {
            const rateColor = event.conversionRate >= 75 ? 'bg-green-500/20 text-green-300' :
                             event.conversionRate >= 50 ? 'bg-blue-500/20 text-blue-300' :
                             event.conversionRate >= 25 ? 'bg-yellow-500/20 text-yellow-300' :
                             'bg-red-500/20 text-red-300'

            return (
              <tr
                key={event.id}
                className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-all group"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      event.type === 'success' ? 'bg-green-400' :
                      event.type === 'warning' ? 'bg-yellow-400' :
                      event.type === 'error' ? 'bg-red-400' :
                      'bg-blue-400'
                    }`}></div>
                    <div>
                      <p className="text-white font-semibold">{event.name}</p>
                      <p className="text-slate-400 text-xs font-mono">{event.message}</p>
                    </div>
                  </div>
                </td>
                <td className="text-center py-4 px-4">
                  <p className="text-white font-bold text-lg">{event.count}</p>
                  <p className="text-slate-400 text-xs">occurrences</p>
                </td>
                <td className="text-center py-4 px-4">
                  <p className="text-white font-bold text-lg">{event.users}</p>
                  <p className="text-slate-400 text-xs">affected</p>
                </td>
                <td className="text-center py-4 px-4">
                  <div className="flex flex-col items-center">
                    <p className={`font-bold text-lg ${
                      event.conversionRate >= 75 ? 'text-green-400' :
                      event.conversionRate >= 50 ? 'text-blue-400' :
                      'text-yellow-400'
                    }`}>
                      {event.conversionRate.toFixed(1)}%
                    </p>
                    {/* Mini bar */}
                    <div className="w-16 h-1 bg-slate-700/50 rounded mt-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${
                          event.conversionRate >= 75 ? 'from-green-400 to-green-500' :
                          event.conversionRate >= 50 ? 'from-blue-400 to-blue-500' :
                          'from-yellow-400 to-yellow-500'
                        }`}
                        style={{ width: `${Math.min(event.conversionRate, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="text-center py-4 px-4">
                  <span className={`inline-block px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider ${rateColor}`}>
                    {event.type}
                  </span>
                </td>
                <td className="text-center py-4 px-4">
                  <div className="flex justify-center">
                    <div className={`w-3 h-3 rounded-full ${
                      event.type === 'success' ? 'bg-green-400 shadow-lg shadow-green-400/50' :
                      event.type === 'warning' ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' :
                      event.type === 'error' ? 'bg-red-400 shadow-lg shadow-red-400/50' :
                      'bg-blue-400 shadow-lg shadow-blue-400/50'
                    } animate-pulse`}></div>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Footer stats */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/50">
            <p className="text-slate-400 text-sm mb-2">Total Events</p>
            <p className="text-2xl font-bold text-white">{events.reduce((sum, e) => sum + e.count, 0)}</p>
          </div>
          <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/50">
            <p className="text-slate-400 text-sm mb-2">Total Users</p>
            <p className="text-2xl font-bold text-white">{events[0]?.users || 0}</p>
          </div>
          <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/50">
            <p className="text-slate-400 text-sm mb-2">Avg Conversion</p>
            <p className="text-2xl font-bold text-green-400">
              {(events.reduce((sum, e) => sum + e.conversionRate, 0) / events.length).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
