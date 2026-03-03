const config = {
  Critical: { bg: 'bg-red-500',    text: 'text-white' },
  High:     { bg: 'bg-orange-500', text: 'text-white' },
  Medium:   { bg: 'bg-yellow-500', text: 'text-white' },
  Low:      { bg: 'bg-green-500',  text: 'text-white' },
}

export default function SeverityBadge({ severity, size = 'sm' }) {
  const c = config[severity] ?? { bg: 'bg-gray-500', text: 'text-white' }
  const padding = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${padding} ${c.bg} ${c.text}`}>
      {severity}
    </span>
  )
}
