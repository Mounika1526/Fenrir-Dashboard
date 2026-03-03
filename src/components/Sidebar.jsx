import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Icon = ({ d, className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const icons = {
  dashboard:
    "M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 3.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z",
  projects:
    "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z",
  scans: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  schedule:
    "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  notifications:
    "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  settings:
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  support:
    "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01",
  sun: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z",
  moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  chevronRight: "M9 18l6-6-6-6",
  menu: "M3 12h18M3 6h18M3 18h18",
  close: "M18 6L6 18M6 6l12 12",
};

const navItems = [
  { label: "Dashboard", icon: "dashboard", to: "/dashboard" },
  { label: "Projects", icon: "projects", to: "/projects" },
  { label: "Scans", icon: "scans", to: "/scan/1" },
  { label: "Schedule", icon: "schedule", to: "/schedule" },
];

const bottomNavItems = [
  { label: "Notifications", icon: "notifications", to: "/notifications" },
  { label: "Settings", icon: "settings", to: "/settings" },
  { label: "Support", icon: "support", to: "/support" },
];

function NavItem({ item }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 group
        ${
          isActive
            ? "bg-[#0CC8A8]/15 text-[#0CC8A8]"
            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <svg
            className="w-5 h-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={icons[item.icon]} />
          </svg>
          <span>{item.label}</span>
          {isActive && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0CC8A8]" />
          )}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const { isDark, toggle } = useTheme();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-60 flex flex-col
          bg-white dark:bg-[#111111]
          border-r border-gray-200 dark:border-[#1C1C1C]
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-gray-200 dark:border-[#1C1C1C]">
          <div className="w-8 h-8 rounded-full bg-[#0CC8A8] flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-black"
              fill="currentColor"
            >
              <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
            </svg>
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
            aps
          </span>

          <button
            onClick={onMobileClose}
            className="ml-auto lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d={icons.close} />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}

          <div className="my-4 border-t border-gray-200 dark:border-[#1C1C1C]" />

          {bottomNavItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-200 dark:border-[#1C1C1C] space-y-2">
          <button
            onClick={toggle}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
              text-gray-500 dark:text-gray-400
              hover:bg-gray-100 dark:hover:bg-white/5
              hover:text-gray-900 dark:hover:text-gray-100
              transition-colors duration-150"
            aria-label="Toggle theme"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={isDark ? icons.sun : icons.moon} />
            </svg>
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-linear-to from-orange-400 to-pink-500 shrink-0 flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                admin@edu.com
              </p>
              <p className="text-[11px] text-gray-400 truncate">
                Security Lead
              </p>
            </div>
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d={icons.chevronRight} />
            </svg>
          </div>
        </div>
      </aside>
    </>
  );
}
