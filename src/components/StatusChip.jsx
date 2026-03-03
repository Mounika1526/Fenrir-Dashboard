const statuses = {
  Completed: {
    border: 'border-green-500',
    text:   'text-green-500',
    bg:     'bg-green-500/10',
  },
  Scheduled: {
    border: 'border-gray-400 dark:border-gray-500',
    text:   'text-gray-500 dark:text-gray-400',
    bg:     'bg-gray-400/10',
  },
  Failed: {
    border: 'border-red-500',
    text:   'text-red-500',
    bg:     'bg-red-500/10',
  },
}

export default function StatusChip({ status }) {
  const c = statuses[status] ?? statuses.Scheduled
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium
        ${c.border} ${c.text} ${c.bg}`}
    >
      {status}
    </span>
  )
}
