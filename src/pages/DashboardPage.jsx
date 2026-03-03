import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import StatusChip from '../components/StatusChip'
import Toast from '../components/Toast'
import { orgStats, severityStats, scans } from '../data/mockData'

/* ── Vuln count badges ── */
const vulnColors = {
  critical: 'bg-red-500',
  high:     'bg-orange-500',
  medium:   'bg-yellow-500',
  low:      'bg-green-500',
}

function VulnBadge({ count, type }) {
  if (count == null) return null
  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-bold text-white ${vulnColors[type]}`}>
      {count}
    </span>
  )
}

/* ── Progress bar ── */
function ProgressBar({ progress, status }) {
  const fillColor =
    status === 'Failed'    ? 'bg-red-500'    :
    status === 'Scheduled' ? 'bg-[#0CC8A8]'  : 'bg-[#0CC8A8]'
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-[#2a2a2a] overflow-hidden min-w-[80px]">
        <div
          className={`h-full rounded-full transition-all ${fillColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 w-9 text-right">{progress}%</span>
    </div>
  )
}

/* ── Severity icon components ── */
function CriticalIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center">
      <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    </div>
  )
}
function HighIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-orange-500/15 flex items-center justify-center">
      <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    </div>
  )
}
function MediumIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-yellow-500/15 flex items-center justify-center">
      <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    </div>
  )
}
function LowIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center">
      <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
  )
}

const SeverityIcons = [CriticalIcon, HighIcon, MediumIcon, LowIcon]

const trendColors = {
  Critical: 'text-red-500',
  High:     'text-orange-500',
  Medium:   'text-yellow-500',
  Low:      'text-green-500',
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)
  const [page, setPage] = useState(1)
  const perPage = 15

  const filtered = useMemo(
    () => scans.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  )

  const paginated = filtered.slice(0, page * perPage)

  function showToast(msg, type = 'info') {
    setToast({ msg, type })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F5F7] dark:bg-[#0F0F0F]">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ── Header ── */}
        <header className="flex items-center justify-between px-6 h-14 flex-shrink-0
          bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-[#1C1C1C]">
          <div className="flex items-center gap-2">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden mr-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Scan</span>
            <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 18l6-6-6-6" />
            </svg>
            <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </button>
            <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400">Private Assets</span>
            <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-sm font-medium text-[#0CC8A8]">New Scan</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Report exported successfully!', 'success')}
              className="px-4 py-1.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-[#333]
                text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              Export Report
            </button>
            <button
              onClick={() => showToast('Scan stopped.', 'error')}
              className="px-4 py-1.5 text-sm font-medium rounded-lg border border-red-300 dark:border-red-500/40
                text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            >
              Stop Scan
            </button>
          </div>
        </header>

        {/* ── Scrollable content ── */}
        <main className="flex-1 overflow-y-auto">

          {/* Org stats bar */}
          <div className="px-6 py-3 border-b border-gray-200 dark:border-[#1C1C1C]
            bg-white dark:bg-[#111111] flex flex-wrap items-center gap-x-5 gap-y-1.5">
            {[
              ['Org', orgStats.org],
              ['Owner', orgStats.owner],
              ['Total Scans', orgStats.totalScans],
              ['Scheduled', orgStats.scheduled],
              ['Rescans', orgStats.rescans],
              ['Failed Scans', orgStats.failedScans],
            ].map(([k, v], i) => (
              <span key={k} className="flex items-center gap-1.5 text-sm">
                {i > 0 && <span className="text-gray-300 dark:text-[#333] select-none">|</span>}
                <span className="text-gray-500 dark:text-gray-400">{k}:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{v}</span>
              </span>
            ))}
            <span className="ml-auto flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5 text-[#0CC8A8] animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
              {orgStats.lastUpdated}
            </span>
          </div>

          {/* Severity counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-[#1C1C1C]
            border-b border-gray-200 dark:border-[#1C1C1C]">
            {severityStats.map((s, i) => {
              const SIcon = SeverityIcons[i]
              return (
                <div key={s.level} className="bg-white dark:bg-[#111111] px-6 py-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {s.level} Severity
                    </span>
                    <SIcon />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{s.count}</p>
                  <p className={`text-xs font-medium ${trendColors[s.level]}`}>
                    {s.direction === 'up' ? '↑' : '↓'} +{s.change}%{' '}
                    <span className="text-gray-400 font-normal">
                      {s.direction === 'up' ? 'increase' : 'decrease'} than yesterday
                    </span>
                  </p>
                </div>
              )
            })}
          </div>

          {/* Table area */}
          <div className="p-6">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2 rounded-lg
                bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a]">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="search"
                  placeholder="Search scans by name or type..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-transparent outline-none"
                  aria-label="Search scans"
                />
              </div>

              <button
                onClick={() => showToast('Filters panel coming soon', 'info')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  border border-gray-200 dark:border-[#2a2a2a]
                  text-gray-600 dark:text-gray-300
                  bg-white dark:bg-[#1a1a1a]
                  hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                Filter
              </button>

              <button
                onClick={() => showToast('Column settings coming soon', 'info')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  border border-gray-200 dark:border-[#2a2a2a]
                  text-gray-600 dark:text-gray-300
                  bg-white dark:bg-[#1a1a1a]
                  hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                </svg>
                Column
              </button>

              <button
                onClick={() => showToast('New scan created!', 'success')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                  bg-[#0CC8A8] hover:bg-[#0ab394] active:bg-[#089e82]
                  text-white transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New scan
              </button>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-gray-200 dark:border-[#1C1C1C] overflow-hidden
              bg-white dark:bg-[#161616] shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#1C1C1C]">
                      {['Scan Name', 'Type', 'Status', 'Progress', 'Vulnerability', 'Last Scan'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((scan, idx) => (
                      <tr
                        key={scan.id}
                        onClick={() => navigate(`/scan/${scan.id}`)}
                        className={`border-b border-gray-100 dark:border-[#1C1C1C] cursor-pointer
                          hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition-colors
                          ${idx === paginated.length - 1 ? 'border-b-0' : ''}`}
                      >
                        <td className="px-4 py-3.5 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {scan.name}
                        </td>
                        <td className="px-4 py-3.5 text-gray-500 dark:text-gray-400">
                          {scan.type}
                        </td>
                        <td className="px-4 py-3.5">
                          <StatusChip status={scan.status} />
                        </td>
                        <td className="px-4 py-3.5 min-w-[160px]">
                          <ProgressBar progress={scan.progress} status={scan.status} />
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1">
                            <VulnBadge count={scan.vuln.critical} type="critical" />
                            <VulnBadge count={scan.vuln.high}     type="high"     />
                            <VulnBadge count={scan.vuln.medium}   type="medium"   />
                            <VulnBadge count={scan.vuln.low}      type="low"      />
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-gray-400 text-xs whitespace-nowrap">
                          {scan.lastScan}
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-gray-400 text-sm">
                          No scans match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-[#1C1C1C]">
                <span className="text-xs text-gray-400">
                  Showing {Math.min(paginated.length, filtered.length)} of {filtered.length} Scans
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 dark:border-[#2a2a2a]
                      text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 transition-colors"
                    aria-label="Previous page"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={paginated.length >= filtered.length}
                    className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 dark:border-[#2a2a2a]
                      text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 transition-colors"
                    aria-label="Next page"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
