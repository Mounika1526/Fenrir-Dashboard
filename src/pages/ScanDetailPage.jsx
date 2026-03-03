import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SeverityBadge from '../components/SeverityBadge'
import Toast from '../components/Toast'
import {
  activeScan, activityLog, verificationLoops,
  findings, statusBarData,
} from '../data/mockData'

function LogLine({ segments }) {
  return (
    <span>
      {segments.map((seg, i) => {
        if (seg.type === 'url') return (
          <span key={i} className="text-[#0CC8A8] break-all">{seg.text}</span>
        )
        if (seg.type === 'path') return (
          <span key={i} className="bg-[#1e2a22] text-[#0CC8A8] rounded px-1 font-mono text-[11px] break-all inline-block leading-relaxed">
            {seg.text}
          </span>
        )
        if (seg.type === 'code') return (
          <span key={i} className="bg-[#1a2030] text-[#7DD3FC] rounded px-1.5 py-0.5 font-mono text-[11px] break-all inline-block leading-relaxed">
            {seg.text}
          </span>
        )
        if (seg.type === 'bold') return (
          <strong key={i} className="text-[#0CC8A8] font-semibold">{seg.text}</strong>
        )
        return <span key={i}>{seg.text}</span>
      })}
    </span>
  )
}

function CircularProgress({ value, label }) {
  const r = 44, circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div className="relative w-20 h-20 sm:w-28 sm:h-28 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="#111" stroke="#222" strokeWidth="6" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke="#0CC8A8" strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg sm:text-2xl font-bold text-[#0CC8A8] leading-none">{value}%</span>
        <span className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">{label}</span>
      </div>
    </div>
  )
}

const stepIcons = {
  Spidering: (cls) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  Mapping: (cls) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  Testing: (cls) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v5.172a2 2 0 01-.586 1.414l-3.828 3.828A2 2 0 005 14.828V19a2 2 0 002 2h10a2 2 0 002-2v-4.172a2 2 0 00-.586-1.414l-3.828-3.828A2 2 0 0114 8.172V3" />
    </svg>
  ),
  Validating: (cls) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  Reporting: (cls) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  ),
}

function StepTracker({ steps, activeStep }) {
  return (
    <div className="flex items-start flex-1 min-w-0 overflow-x-auto pb-1">
      {steps.map((step, i) => {
        const isActive = i === activeStep
        const isDone   = i < activeStep
        const iconCls  = `w-3 h-3 sm:w-4 sm:h-4 ${isActive ? 'text-black' : isDone ? 'text-[#0CC8A8]' : 'text-gray-400'}`
        const renderIcon = stepIcons[step] || stepIcons.Spidering
        return (
          <div key={step} className="flex items-start flex-1 min-w-0">
            <div className="flex flex-col items-center shrink-0">
              <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 transition-colors
                ${isActive ? 'bg-[#0CC8A8] border-[#0CC8A8]' :
                  isDone   ? 'bg-[#0CC8A8]/20 border-[#0CC8A8]' :
                             'bg-gray-100 dark:bg-[#222] border-gray-300 dark:border-[#333]'}`}>
                {renderIcon(iconCls)}
              </div>
              <span className={`text-[10px] sm:text-[11px] mt-1 sm:mt-1.5 font-medium whitespace-nowrap
                ${isActive ? 'text-[#0CC8A8]' : 'text-gray-400 dark:text-gray-500'}`}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mt-3.5 sm:mt-4.5 mx-0.5 sm:mx-1 rounded transition-colors
                ${isDone ? 'bg-[#0CC8A8]' : 'bg-gray-200 dark:bg-[#2a2a2a]'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

const criticalCount = findings.filter(f => f.severity === 'Critical').length

export default function ScanDetailPage() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [activeTab, setActiveTab]       = useState('activity')
  const [mobilePanel, setMobilePanel]   = useState('console')
  const [toast, setToast]               = useState(null)
  const [consoleOpen, setConsoleOpen]   = useState(true)
  const scan = activeScan

  const logEntries = activeTab === 'activity' ? activityLog : verificationLoops

  function showToast(msg, type = 'info') { setToast({ msg, type }) }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-[#0F0F0F]">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 shrink-0
          bg-white dark:bg-[#111] border-b border-gray-200 dark:border-[#1c1c1c]">
          <div className="flex items-center gap-1.5 sm:gap-2 text-sm min-w-0 mr-3">
            <button onClick={() => setMobileOpen(true)} aria-label="Open menu"
              className="lg:hidden mr-1 text-gray-500 shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <span className="font-semibold text-gray-900 dark:text-white shrink-0">Scan</span>
            <span className="text-gray-300 dark:text-gray-600 shrink-0">/</span>
            <button onClick={() => navigate('/dashboard')} aria-label="Dashboard"
              className="text-gray-500 dark:text-gray-400 hover:text-[#0CC8A8] transition-colors shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </button>
            <span className="text-gray-300 dark:text-gray-600 shrink-0 hidden sm:block">/</span>
            <button onClick={() => navigate('/dashboard')}
              className="hidden sm:block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors truncate max-w-28">
              {scan.project}
            </button>
            <span className="text-gray-300 dark:text-gray-600 shrink-0">/</span>
            <span className="font-medium text-[#0CC8A8] truncate">{scan.name}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => showToast('Report exported!', 'success')}
              className="hidden sm:flex px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-[#333]
                text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              Export Report
            </button>
            <button onClick={() => showToast('Scan stopped.', 'error')}
              className="hidden sm:flex px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-[#333]
                text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              Stop Scan
            </button>
            <button onClick={() => showToast('Report exported!', 'success')} aria-label="Export report"
              className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 dark:border-[#333]
                text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
            <button onClick={() => showToast('Scan stopped.', 'error')} aria-label="Stop scan"
              className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-red-300 dark:border-red-900/60
                text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="1.5" />
              </svg>
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col overflow-hidden min-h-0">

          <div className="shrink-0 bg-white dark:bg-[#111] border-b border-gray-200 dark:border-[#1c1c1c] px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex items-center gap-4 sm:gap-6">
              <CircularProgress value={scan.progress} label={scan.status} />

              <div className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-4">
                <StepTracker steps={scan.steps} activeStep={scan.activeStep} />

                <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2">
                  {[
                    ['Scan Type',   scan.scanType],
                    ['Targets',     scan.targets],
                    ['Started At',  scan.startedAt],
                    ['Credentials', scan.credentials],
                    ['Files',       scan.files],
                    ['Checklists',  scan.checklists],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col min-w-0">
                      <span className="text-[10px] sm:text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        {k}
                      </span>
                      <span className={`text-xs sm:text-sm font-semibold mt-0.5 truncate
                        ${k === 'Checklists' ? 'text-[#0CC8A8]' : 'text-gray-900 dark:text-white'}`}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {consoleOpen && (
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">

              <div className="lg:hidden flex shrink-0 bg-white dark:bg-[#111] border-b border-gray-200 dark:border-[#1c1c1c]">
                <button
                  onClick={() => setMobilePanel('console')}
                  className={`flex-1 py-2.5 text-sm font-medium border-b-2 transition-colors
                    ${mobilePanel === 'console'
                      ? 'border-[#0CC8A8] text-[#0CC8A8]'
                      : 'border-transparent text-gray-500 dark:text-gray-400'}`}>
                  Console
                </button>
                <button
                  onClick={() => setMobilePanel('findings')}
                  className={`flex-1 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5
                    ${mobilePanel === 'findings'
                      ? 'border-[#0CC8A8] text-[#0CC8A8]'
                      : 'border-transparent text-gray-500 dark:text-gray-400'}`}>
                  Findings
                  <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-red-500 text-white rounded-full">
                    {criticalCount}
                  </span>
                </button>
              </div>

              <div className={`flex-col flex-1 min-w-0 overflow-hidden
                border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-[#1c1c1c]
                bg-white dark:bg-[#111]
                ${mobilePanel === 'console' ? 'flex' : 'hidden lg:flex'}`}>

                <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-gray-200 dark:border-[#1c1c1c] shrink-0">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Live Scan Console</span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-100 dark:bg-[#1e1e1e] rounded-full px-2.5 py-0.5">
                      <svg className="w-3 h-3 animate-spin shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                      </svg>
                      <span className="hidden xs:inline">Running...</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setConsoleOpen(false)}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-[#222] text-gray-400"
                    aria-label="Close console">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex border-b border-gray-200 dark:border-[#1c1c1c] shrink-0 px-1" role="tablist">
                  {[['activity', 'Activity Log'], ['loops', 'Verification Loops']].map(([id, label]) => (
                    <button
                      key={id}
                      role="tab"
                      aria-selected={activeTab === id}
                      onClick={() => setActiveTab(id)}
                      className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors -mb-px
                        ${activeTab === id
                          ? 'border-[#0CC8A8] text-[#0CC8A8]'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}>
                      {label}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-[#0D0D0D] font-mono text-xs leading-relaxed space-y-3">
                  {logEntries.map((entry, i) => (
                    <div key={i} className="flex gap-2 min-w-0">
                      <span className="text-gray-500 select-none shrink-0">[{entry.time}]</span>
                      <span className="text-gray-300 wrap-break-word min-w-0 flex-1">
                        <LogLine segments={entry.segments} />
                      </span>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <span className="text-gray-500 select-none">{'>'}</span>
                    <span className="inline-block w-2 h-3.5 bg-[#0CC8A8] animate-pulse" />
                  </div>
                </div>
              </div>

              <div className={`flex-col overflow-hidden bg-white dark:bg-[#111]
                w-full lg:w-80 xl:w-96 lg:shrink-0
                ${mobilePanel === 'findings' ? 'flex flex-1 lg:flex-none' : 'hidden lg:flex'}`}>

                <div className="px-4 py-2.5 border-b border-gray-200 dark:border-[#1c1c1c] shrink-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Finding Log</h3>
                    <span className="text-xs text-gray-400 tabular-nums">{findings.length} findings</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {findings.map(f => (
                    <div key={f.id}
                      className="rounded-xl border border-gray-200 dark:border-[#2a2a2a]
                        bg-gray-50 dark:bg-[#1a1a1a] p-3 sm:p-4 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <SeverityBadge severity={f.severity} />
                        <span className="text-xs text-gray-400 font-mono shrink-0">{f.time}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                        {f.title}
                      </p>
                      <p className="text-xs font-mono text-[#0CC8A8] break-all">{f.endpoint}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!consoleOpen && (
            <div className="flex-1 flex items-center justify-center p-6">
              <button
                onClick={() => setConsoleOpen(true)}
                className="px-5 py-2.5 rounded-lg border border-gray-200 dark:border-[#2a2a2a]
                  text-sm font-medium text-gray-500 dark:text-gray-400
                  hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors">
                Reopen Console
              </button>
            </div>
          )}
        </div>

        <div className="shrink-0 flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2
          bg-[#0D0D0D] border-t border-[#1c1c1c] text-xs">
          <div className="flex items-center gap-3 sm:gap-5 text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="hidden sm:inline">Sub-agents: </span>
              <span className="sm:hidden">Agents: </span>
              <strong className="text-white">{statusBarData.subAgents}</strong>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
              Parallel: <strong className="text-white ml-1">{statusBarData.parallelExecutions}</strong>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
              Ops: <strong className="text-white ml-1">{statusBarData.operations}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <span className="text-red-500">
              <span className="hidden sm:inline">Critical: </span>
              <span className="sm:hidden">C: </span>
              <strong>{statusBarData.critical}</strong>
            </span>
            <span className="text-orange-500">
              <span className="hidden sm:inline">High: </span>
              <span className="sm:hidden">H: </span>
              <strong>{statusBarData.high}</strong>
            </span>
            <span className="text-yellow-500">
              <span className="hidden sm:inline">Medium: </span>
              <span className="sm:hidden">M: </span>
              <strong>{statusBarData.medium}</strong>
            </span>
            <span className="text-green-500">
              <span className="hidden sm:inline">Low: </span>
              <span className="sm:hidden">L: </span>
              <strong>{statusBarData.low}</strong>
            </span>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
