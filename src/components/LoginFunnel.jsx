export default function LoginFunnel({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-500">No funnel data available</div>
  }

  const maxUsers = data[0]?.users || 1

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Login Funnel</h2>

      <div className="space-y-6">
        {data.map((step, idx) => {
          const width = (step.users / maxUsers) * 100
          const isLast = idx === data.length - 1

          return (
            <div key={idx}>
              <div className="flex items-baseline gap-4 mb-3">
                <div className="min-w-fit">
                  <h3 className="text-lg font-bold text-gray-900">Step {idx + 1}</h3>
                  <p className="text-gray-600">{step.name}</p>
                </div>
                <div className="flex gap-8 text-sm">
                  <div>
                    <span className="text-gray-500">Users: </span>
                    <span className="font-bold text-gray-900">{step.users}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Events: </span>
                    <span className="font-bold text-gray-900">{step.events || 0}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Conversion: </span>
                    <span className="font-bold text-gray-900">{step.conversion?.toFixed(1) || 0}%</span>
                  </div>
                </div>
              </div>

              {/* Funnel bar */}
              <div className="h-10 bg-gray-100 rounded overflow-hidden mb-4">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{ width: `${width}%` }}
                ></div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div className="flex justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <p className="text-gray-500 text-sm">Entry Points</p>
            <p className="text-2xl font-bold text-gray-900">{data[0]?.users || 0}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Completions</p>
            <p className="text-2xl font-bold text-gray-900">{data[data.length - 1]?.users || 0}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Overall Conversion</p>
            <p className="text-2xl font-bold text-gray-900">
              {data.length > 0 ? (((data[data.length - 1]?.users || 0) / (data[0]?.users || 1)) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
