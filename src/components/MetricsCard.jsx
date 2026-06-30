export default function MetricsCard({ title, value, subtext, icon, highlight }) {
  return (
    <div className={`p-6 rounded-xl border backdrop-blur-xl transition-all hover:shadow-lg ${
      highlight
        ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/10 border-green-500/40 hover:border-green-400/60'
        : 'bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-700/50 hover:border-purple-500/40'
    }`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">{title}</p>
          <p className={`text-3xl font-bold ${
            highlight ? 'text-green-400' : 'text-white'
          }`}>
            {value}
          </p>
          {subtext && (
            <p className="text-slate-400 text-xs mt-2">{subtext}</p>
          )}
        </div>
        <span className="text-4xl opacity-80">{icon}</span>
      </div>

      {/* Animated background */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity ${
        highlight ? 'bg-green-500' : 'bg-purple-500'
      }`}></div>
    </div>
  )
}
