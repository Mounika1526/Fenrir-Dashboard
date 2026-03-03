import { useEffect, useState } from 'react'

const DURATION = 3000

export default function Toast({ message, type = 'info', onClose }) {
  const [leaving, setLeaving] = useState(false)

  // auto-dismiss
  useEffect(() => {
    const t = setTimeout(() => handleClose(), DURATION)
    return () => clearTimeout(t)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleClose() {
    setLeaving(true)
  }

  // once slide-out finishes, call parent onClose
  function handleAnimationEnd() {
    if (leaving) onClose()
  }

  const accent =
    type === 'success' ? 'border-l-[#0CC8A8]' :
    type === 'error'   ? 'border-l-red-500'   :
                         'border-l-blue-500'

  const barColor =
    type === 'success' ? 'bg-[#0CC8A8]' :
    type === 'error'   ? 'bg-red-500'   :
                         'bg-blue-500'

  const icon =
    type === 'success' ? (
      <svg className="w-5 h-5 text-[#0CC8A8] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ) : type === 'error' ? (
      <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ) : (
      <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    )

  return (
    <>
      <style>{`
        @keyframes toast-in {
          from { transform: translateX(calc(100% + 24px)); opacity: 0; }
          to   { transform: translateX(0);                 opacity: 1; }
        }
        @keyframes toast-out {
          from { transform: translateX(0);                 opacity: 1; }
          to   { transform: translateX(calc(100% + 24px)); opacity: 0; }
        }
        @keyframes toast-progress {
          from { width: 100%; }
          to   { width: 0%;   }
        }
        .toast-enter {
          animation: toast-in 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
        }
        .toast-leave {
          animation: toast-out 0.3s cubic-bezier(0.06, 0.71, 0.55, 1) forwards;
        }
        .toast-bar {
          animation: toast-progress ${DURATION}ms linear forwards;
        }
      `}</style>

      <div
        onAnimationEnd={handleAnimationEnd}
        className={`fixed bottom-6 right-6 z-50 rounded-xl border-l-4 border border-gray-200
          dark:border-gray-700 shadow-2xl bg-white dark:bg-[#1e1e1e] overflow-hidden
          ${accent} ${leaving ? 'toast-leave' : 'toast-enter'}`}
        style={{ minWidth: 300, maxWidth: 380 }}
      >
        {/* content row */}
        <div className="flex items-start gap-3 px-4 pt-4 pb-3">
          {icon}
          <span className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug">
            {message}
          </span>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors ml-1 leading-none text-lg"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* progress drain bar */}
        <div className="h-0.5 bg-gray-100 dark:bg-gray-800">
          <div className={`h-full toast-bar ${barColor}`} />
        </div>
      </div>
    </>
  )
}
