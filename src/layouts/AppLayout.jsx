import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getMyRequests, getMyConnections } from "../api/matchRequestApi";

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
    label: "Connections",
    path: "/connections",
    icon: (
      <svg viewBox="0 0 15 15" fill="none" width="15" height="15">
        <circle cx="4.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
        <circle
          cx="10.5"
          cy="5"
          r="2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M1 13C1 11.3 2.6 10 4.5 10"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M14 13C14 11.3 12.4 10 10.5 10"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M5.5 12C5.5 10.6 6.4 9.5 7.5 9.5C8.6 9.5 9.5 10.6 9.5 12"
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
  const [pendingCount, setPendingCount] = useState(0);
  const [connectionCount, setConnectionCount] = useState(0);

  useEffect(() => {
    async function loadCounts() {
      try {
        const reqRes = await getMyRequests();
        const pending = reqRes.data.filter(
          (r) => r.status === "PENDING",
        ).length;
        setPendingCount(pending);
      } catch {}
      try {
        const connRes = await getMyConnections();
        setConnectionCount(connRes.data.length);
      } catch {}
    }
    loadCounts();
  }, [location.pathname]); // refresh counts on navigation

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
    : user?.email?.charAt(0).toUpperCase() || "U";

  const mainNav = navItems.slice(0, 2);
  const connectionsNav = navItems.slice(2, 3);
  const settingsNav = navItems.slice(3);

  const NavButton = ({ item }) => {
    const isActive = location.pathname === item.path;
    const badge =
      item.path === "/dashboard" && pendingCount > 0
        ? pendingCount
        : item.path === "/connections" && connectionCount > 0
          ? connectionCount
          : null;

    return (
      <button
        onClick={() => navigate(item.path)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 10px",
          borderRadius: 8,
          border: "none",
          background: isActive ? "rgba(59,130,246,0.15)" : "transparent",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.1s",
        }}
        onMouseEnter={(e) => {
          if (!isActive)
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        }}
        onMouseLeave={(e) => {
          if (!isActive) e.currentTarget.style.background = "transparent";
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            flexShrink: 0,
            background: isActive
              ? "rgba(59,130,246,0.2)"
              : "rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isActive ? "#60a5fa" : "#64748b",
          }}
        >
          {item.icon}
        </div>
        <span
          style={{
            fontSize: 13,
            flex: 1,
            color: isActive ? "#f1f5f9" : "#94a3b8",
            fontWeight: isActive ? 500 : 400,
          }}
        >
          {item.label}
        </span>
        {/* Pending badge on Dashboard */}
        {item.path === "/dashboard" && pendingCount > 0 && (
          <span
            style={{
              background: "#ef4444",
              color: "white",
              fontSize: 10,
              fontWeight: 700,
              minWidth: 16,
              height: 16,
              borderRadius: 99,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
            }}
          >
            {pendingCount}
          </span>
        )}
        {/* Connection count badge */}
        {item.path === "/connections" && connectionCount > 0 && (
          <span
            style={{
              background: "rgba(59,130,246,0.2)",
              color: "#60a5fa",
              fontSize: 10,
              fontWeight: 600,
              minWidth: 16,
              height: 16,
              borderRadius: 99,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
            }}
          >
            {connectionCount}
          </span>
        )}
        {isActive && (
          <div
            style={{
              width: 3,
              height: 16,
              background: "#3b82f6",
              borderRadius: 99,
              flexShrink: 0,
            }}
          />
        )}
      </button>
    );
  };

  const SectionLabel = ({ label }) => (
    <p
      style={{
        fontSize: 10,
        fontWeight: 600,
        color: "#475569",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        margin: "16px 0 6px",
        padding: "0 10px",
      }}
    >
      {label}
    </p>
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#f8fafc",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 228,
          background: "#0f172a",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: "20px 16px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
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
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#f1f5f9",
                  margin: 0,
                  letterSpacing: 0.1,
                }}
              >
                Roommate Finder
              </p>
              <p style={{ fontSize: 11, color: "#475569", margin: "2px 0 0" }}>
                Find your match
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav
          style={{
            flex: 1,
            padding: "8px 6px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SectionLabel label="Main" />
          {mainNav.map((item) => (
            <NavButton key={item.path} item={item} />
          ))}

          <SectionLabel label="Social" />
          {connectionsNav.map((item) => (
            <NavButton key={item.path} item={item} />
          ))}

          <SectionLabel label="Settings" />
          {settingsNav.map((item) => (
            <NavButton key={item.path} item={item} />
          ))}
        </nav>

        {/* User + Logout */}
        <div
          style={{
            padding: "10px 6px 10px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 10px",
              borderRadius: 8,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                flexShrink: 0,
                background: "linear-gradient(135deg, #1e3a5f, #1d4ed8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
                color: "#93c5fd",
              }}
            >
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#e2e8f0",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.name || user?.email || "My account"}
              </p>
              <p style={{ fontSize: 11, color: "#475569", margin: "1px 0 0" }}>
                Free plan
              </p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                flexShrink: 0,
                background: "rgba(239,68,68,0.1)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(239,68,68,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(239,68,68,0.1)")
              }
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
      <main style={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
