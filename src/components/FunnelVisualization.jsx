import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts'

export default function FunnelVisualization({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        No funnel data available
      </div>
    )
  }

  const maxUsers = data[0]?.users || 1

  return (
    <div className="space-y-8">
      {/* Visual Funnel */}
      <div className="space-y-4">
        {data.map((item, idx) => {
          const width = (item.users / maxUsers) * 100
          const dropoff = item.dropoff || 0

          return (
            <div key={idx} className="animate-fade-in">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 items-center justify-center text-white text-xs font-bold">
                      {idx + 1}
                    </span>
                    <h3 className="text-white font-bold text-lg">{item.name}</h3>
                  </div>
                  <p className="text-slate-400 text-sm ml-10">{item.description}</p>
                </div>
                <div className="text-right bg-slate-700/40 rounded-lg px-4 py-2">
                  <p className="text-white font-bold text-xl">{item.users}</p>
                  <p className="text-slate-400 text-xs">users</p>
                </div>
              </div>

              {/* Funnel bar */}
              <div className="relative h-16 bg-slate-700/30 rounded-xl overflow-hidden ml-10 border border-slate-600/30">
                <div
                  className="funnel-bar h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-between px-4 relative group hover:shadow-lg transition-all"
                  style={{ width: `${width}%` }}
                >
                  <span className="text-white text-sm font-bold">{Math.round(width)}%</span>
                  <span className="text-white text-xs opacity-80">{item.events} events</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-2 mt-2 ml-10 text-xs">
                <div className="bg-slate-700/20 rounded-lg px-3 py-2">
                  <p className="text-slate-400">Conversion</p>
                  <p className={`font-bold ${
                    item.conversionRate >= 75 ? 'text-green-400' :
                    item.conversionRate >= 50 ? 'text-blue-400' :
                    'text-yellow-400'
                  }`}>
                    {item.conversionRate.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-slate-700/20 rounded-lg px-3 py-2">
                  <p className="text-slate-400">Dropoff</p>
                  <p className={`font-bold ${
                    item.dropoffRate <= 10 ? 'text-green-400' :
                    item.dropoffRate <= 30 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {item.dropoffRate.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-slate-700/20 rounded-lg px-3 py-2">
                  <p className="text-slate-400">Avg Time</p>
                  <p className="text-white font-bold">{item.avgTimeToComplete}</p>
                </div>
                <div className="bg-slate-700/20 rounded-lg px-3 py-2">
                  <p className="text-slate-400">Lost Users</p>
                  <p className="text-red-400 font-bold">{dropoff}</p>
                </div>
              </div>

              {/* Dropoff indicator */}
              {dropoff > 0 && (
                <div className="mt-2 ml-10 text-xs text-red-400 font-semibold">
                  ↘ {dropoff} user{dropoff > 1 ? 's' : ''} dropped off ({item.dropoffRate.toFixed(1)}%)
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8 border-t border-slate-700">
        {/* User progression chart */}
        <div>
          <h3 className="text-white font-bold mb-4">User Progression</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94A3B8" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #7c3aed',
                  borderRadius: '8px',
                  color: '#E2E8F0'
                }}
              />
              <Bar dataKey="users" radius={[8, 8, 0, 0]} gradient="true">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || '#8B5CF6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion rate chart */}
        <div>
          <h3 className="text-white font-bold mb-4">Conversion & Dropoff Rates</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94A3B8" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#94A3B8" domain={[0, 100]} label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #7c3aed',
                  borderRadius: '8px',
                  color: '#E2E8F0'
                }}
              />
              <Line type="monotone" dataKey="conversionRate" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 4 }} name="Conversion %" />
              <Line type="monotone" dataKey="dropoffRate" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', r: 4 }} name="Dropoff %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
