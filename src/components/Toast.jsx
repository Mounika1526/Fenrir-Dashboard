import { useEffect } from 'react'

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  const accent =
    type === 'success' ? 'border-l-[#0CC8A8] bg-[#0CC8A8]/10' :
    type === 'error'   ? 'border-l-red-500 bg-red-500/10' :
    'border-l-blue-500 bg-blue-500/10'

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 rounded-lg border-l-4
        border border-gray-200 dark:border-gray-700 p-4 shadow-xl
        bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 ${accent}
        animate-in slide-in-from-right-8 duration-300`}
      style={{ minWidth: 280 }}
    >
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg leading-none"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  )
}
