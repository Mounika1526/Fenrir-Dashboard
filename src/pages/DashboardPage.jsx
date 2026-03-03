import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import Sidebar from "../components/Sidebar";
import StatusChip from "../components/StatusChip";
import Toast from "../components/Toast";
import { orgStats, severityStats, scans } from "../data/mockData";


function SeverityIcon({ level }) {
  const cls = "w-7 h-7 text-gray-400 dark:text-gray-500 flex-shrink-0";

  if (level === "Critical") {
    return (
      <svg
        className={cls}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    );
  }

  if (level === "High" || level === "Medium") {
    return (
      <svg
        className={cls}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }

  return (
    <svg
      className={cls}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

const vulnColors = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

function VulnBadge({ count, type }) {
  if (count == null) return null;
  return (
    <span
      className={`inline-flex items-center justify-center w-7 h-7 rounded text-xs font-bold text-white ${vulnColors[type]}`}
    >
      {count}
    </span>
  );
}

function ProgressBar({ progress, status }) {
  const fill = status === "Failed" ? "bg-red-500" : "bg-[#0CC8A8]";
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrent(progress);
    }, 80);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-[#2a2a2a] overflow-hidden"
        style={{ minWidth: 80 }}
      >
        <div
          className={`h-full rounded-full ${fill}`}
          style={{
            width: `${current}%`,
            transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
      <span className="text-xs tabular-nums text-gray-500 dark:text-gray-400 w-8 text-right">
        <CountUp end={progress} duration={1.2} suffix="%" />
      </span>
    </div>
  );
}

const trendColor = {
  Critical: "text-red-500",
  High: "text-orange-500",
  Medium: "text-green-500",
  Low: "text-green-500",
};

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100 dark:border-[#1c1c1c] animate-pulse">
      <td className="px-5 py-4"><div className="h-4 w-28 rounded bg-gray-200 dark:bg-[#2a2a2a]" /></td>
      <td className="px-5 py-4"><div className="h-4 w-16 rounded bg-gray-200 dark:bg-[#2a2a2a]" /></td>
      <td className="px-5 py-4"><div className="h-5 w-20 rounded-md bg-gray-200 dark:bg-[#2a2a2a]" /></td>
      <td className="px-5 py-4"><div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-[#2a2a2a]" /></td>
      <td className="px-5 py-4"><div className="flex gap-1.5">{[1,2,3,4].map(n => <div key={n} className="w-7 h-7 rounded bg-gray-200 dark:bg-[#2a2a2a]" />)}</div></td>
      <td className="px-5 py-4"><div className="h-3 w-12 rounded bg-gray-200 dark:bg-[#2a2a2a]" /></td>
    </tr>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const perPage = 15;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () =>
      scans.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.type.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const paginated = filtered.slice(0, page * perPage);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-[#0F0F0F]">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 shrink-0 bg-white dark:bg-[#111] border-b border-gray-200 dark:border-[#1c1c1c]">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden mr-2 text-gray-500"
              aria-label="Menu"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <span className="font-semibold text-gray-900 dark:text-white">
              Scan
            </span>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <svg
              className="w-3.5 h-3.5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-500 dark:text-gray-400">
              Private Assets
            </span>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="font-medium text-[#0CC8A8]">New Scan</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setToast({ msg: "Report exported!", type: "success" })
              }
              className="px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-[#333] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              Export Report
            </button>
            <button
              onClick={() => setToast({ msg: "Scan stopped.", type: "error" })}
              className="px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-[#333] text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              Stop Scan
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="shrink-0 flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 bg-white dark:bg-[#111] border-b border-gray-200 dark:border-[#1c1c1c]">
            {[
              ["Org", orgStats.org],
              ["Owner", orgStats.owner],
              ["Total Scans", orgStats.totalScans],
              ["Scheduled", orgStats.scheduled],
              ["Rescans", orgStats.rescans],
              ["Failed Scans", orgStats.failedScans],
            ].map(([k, v], i) => (
              <span key={k} className="flex items-center gap-1.5 text-sm">
                {i > 0 && (
                  <span className="text-gray-300 dark:text-gray-700 mr-1">
                    |
                  </span>
                )}
                <span className="text-gray-500 dark:text-gray-400">{k}:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {v}
                </span>
              </span>
            ))}
            <span className="ml-auto flex items-center gap-1.5 text-xs text-gray-400">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
              </svg>
              {orgStats.lastUpdated}
            </span>
          </div>

          <div className="shrink-0 grid grid-cols-2 lg:grid-cols-4 border-b border-gray-200 dark:border-[#1c1c1c]">
            {severityStats.map((s, i) => (
              <div
                key={s.level}
                className={`px-6 py-5 bg-white dark:bg-[#111]
                  ${i < severityStats.length - 1 ? "border-r border-gray-200 dark:border-[#1c1c1c]" : ""}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {s.level} Severity
                  </span>
                  <SeverityIcon level={s.level} />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  <CountUp end={s.count} duration={2} separator="," />
                </p>
                <p className={`text-xs font-medium ${trendColor[s.level]}`}>
                  {s.direction === "up" ? "↑" : "↓"} +{s.change}%{" "}
                  <span className="text-gray-400 font-normal">
                    {s.direction === "up" ? "increase" : "decrease"} than
                    yesterday
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="flex-1 min-w-50 flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#161616]">
                <svg
                  className="w-4 h-4 text-gray-400 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="search"
                  placeholder="Search scans by name or type..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-transparent outline-none"
                />
              </div>

              <button
                onClick={() => setToast({ msg: "Filters applied.", type: "info" })}
                aria-label="Filter scans"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-200 dark:border-[#2a2a2a] text-gray-600 dark:text-gray-300 bg-white dark:bg-[#161616] hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                Filter
              </button>

              <button
                onClick={() => setToast({ msg: "Column settings updated.", type: "info" })}
                aria-label="Toggle columns"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-200 dark:border-[#2a2a2a] text-gray-600 dark:text-gray-300 bg-white dark:bg-[#161616] hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                Column
              </button>

              <button
                onClick={() => navigate("/scan/new")}
                aria-label="Create new scan"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#0CC8A8] hover:bg-[#0ab394] text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New scan
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-[#1c1c1c] overflow-hidden bg-white dark:bg-[#161616]">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#1c1c1c]">
                      {[
                        "Scan Name",
                        "Type",
                        "Status",
                        "Progress",
                        "Vulnerability",
                        "Last Scan",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      [1,2,3,4,5].map(n => <SkeletonRow key={n} />)
                    ) : paginated.map((scan, idx) => (
                      <tr
                        key={scan.id}
                        onClick={() => navigate(`/scan/${scan.id}`)}
                        tabIndex={0}
                        role="button"
                        aria-label={`View scan ${scan.name}`}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/scan/${scan.id}`) }}
                        className={`border-b border-gray-100 dark:border-[#1c1c1c] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-colors ${idx === paginated.length - 1 ? "border-b-0" : ""}`}
                      >
                        <td className="px-5 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {scan.name}
                        </td>
                        <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                          {scan.type}
                        </td>
                        <td className="px-5 py-4">
                          <StatusChip status={scan.status} />
                        </td>
                        <td className="px-5 py-4" style={{ minWidth: 160 }}>
                          <ProgressBar
                            progress={scan.progress}
                            status={scan.status}
                          />
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <VulnBadge
                              count={scan.vuln.critical}
                              type="critical"
                            />
                            <VulnBadge count={scan.vuln.high} type="high" />
                            <VulnBadge count={scan.vuln.medium} type="medium" />
                            <VulnBadge count={scan.vuln.low} type="low" />
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                          {scan.lastScan}
                        </td>
                      </tr>
                    ))}
                    {!loading && filtered.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-5 py-12 text-center text-gray-400 text-sm"
                        >
                          No scans match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-[#1c1c1c]">
                <span className="text-xs text-gray-400">
                  Showing {Math.min(paginated.length, filtered.length)} of{" "}
                  {filtered.length} Scans
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    aria-label="Previous page"
                    className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 dark:border-[#2a2a2a] text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={paginated.length >= filtered.length}
                    aria-label="Next page"
                    className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 dark:border-[#2a2a2a] text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
