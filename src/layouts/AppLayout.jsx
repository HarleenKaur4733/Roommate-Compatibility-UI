import { useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: (
      <svg viewBox="0 0 15 15" fill="none" width="15" height="15">
        <path
          d="M2 8L7.5 2.5L13 8V13H9.5V10H5.5V13H2V8Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "My profile",
    path: "/profile",
    icon: (
      <svg viewBox="0 0 15 15" fill="none" width="15" height="15">
        <circle
          cx="7.5"
          cy="5"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M2 13C2 10.8 4.5 9 7.5 9C10.5 9 13 10.8 13 13"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Preferences",
    path: "/preferences",
    icon: (
      <svg viewBox="0 0 15 15" fill="none" width="15" height="15">
        <rect
          x="2"
          y="4"
          width="11"
          height="1.2"
          rx="0.6"
          fill="currentColor"
        />
        <rect
          x="2"
          y="7.4"
          width="7"
          height="1.2"
          rx="0.6"
          fill="currentColor"
        />
        <rect
          x="2"
          y="10.8"
          width="9"
          height="1.2"
          rx="0.6"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutUser, user } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-[240px] bg-[#0f172a] flex flex-col flex-shrink-0 sticky top-0 h-screen">
        {/* Brand */}
        <div className="px-5 py-6 border-b border-white/[0.07]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                <path
                  d="M8 2C5.8 2 4 3.8 4 6C4 8.2 5.8 10 8 10C10.2 10 12 8.2 12 6C12 3.8 10.2 2 8 2Z"
                  fill="white"
                  opacity="0.9"
                />
                <path
                  d="M2 14C2 11.8 4.7 10 8 10C11.3 10 14 11.8 14 14"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-medium text-slate-100 leading-none">
                Roommate Finder
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Find your match
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
          <p className="text-[10px] font-medium text-slate-500 tracking-widest uppercase px-2 mb-1.5">
            Main
          </p>

          {navItems.slice(0, 2).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all duration-100 ${
                  isActive ? "bg-blue-500/15" : "hover:bg-white/[0.06]"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${
                    isActive
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-white/[0.05] text-slate-500"
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`text-[13px] ${isActive ? "text-slate-100 font-medium" : "text-slate-400"}`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-[3px] h-4 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}

          <p className="text-[10px] font-medium text-slate-500 tracking-widest uppercase px-2 mt-4 mb-1.5">
            Settings
          </p>

          {navItems.slice(2).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all duration-100 ${
                  isActive ? "bg-blue-500/15" : "hover:bg-white/[0.06]"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${
                    isActive
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-white/[0.05] text-slate-500"
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`text-[13px] ${isActive ? "text-slate-100 font-medium" : "text-slate-400"}`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-[3px] h-4 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-3 border-t border-white/[0.07]">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-white/[0.05] transition-all cursor-default">
            <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-[12px] font-medium text-blue-200 flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-slate-200 truncate">
                {user?.name || user?.email || "My account"}
              </p>
              <p className="text-[11px] text-slate-500">Free plan</p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="w-7 h-7 rounded-md bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center transition-all flex-shrink-0"
            >
              <svg viewBox="0 0 13 13" fill="none" width="13" height="13">
                <path
                  d="M5 2H2V11H5"
                  stroke="#f87171"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 4.5L11 6.5L8.5 8.5"
                  stroke="#f87171"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 6.5H11"
                  stroke="#f87171"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
