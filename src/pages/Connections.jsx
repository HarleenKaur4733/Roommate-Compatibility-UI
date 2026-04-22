import { useEffect, useState, useContext } from "react";
import { getMyConnections } from "../api/matchRequestApi";
import { AuthContext } from "../context/AuthContext";

export default function Connections() {
  const { user } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getMyConnections();
        setConnections(res.data);
      } catch {
        setConnections([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /**
   * JWT payloads vary by backend. Try the most common claims in order:
   *   sub (Spring Security default) → id → userId
   * All are coerced to string for safe comparison against the API's numeric ids.
   */
  const getMyId = () => {
    if (!user) return null;
    return String(user.userId ?? "");
  };

  const getOtherUser = (conn) => {
    const myId = getMyId();
    const isSender = String(conn.sender.id) === myId;
    console.log("my id", myId);
    console.log("Sender Id", String(conn.sender.id));
    return isSender ? conn.receiver : conn.sender;
  };

  const avatarPalette = [
    { bg: "linear-gradient(135deg, #dbeafe, #bfdbfe)", text: "#1d4ed8" },
    { bg: "linear-gradient(135deg, #d1fae5, #a7f3d0)", text: "#065f46" },
    { bg: "linear-gradient(135deg, #ede9fe, #ddd6fe)", text: "#5b21b6" },
    { bg: "linear-gradient(135deg, #fce7f3, #fbcfe8)", text: "#9d174d" },
    { bg: "linear-gradient(135deg, #fef3c7, #fde68a)", text: "#92400e" },
  ];

  return (
    <div
      style={{
        padding: "32px",
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#0f172a",
            margin: "0 0 4px",
            letterSpacing: -0.3,
          }}
        >
          Your Connections
        </h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
          People you've mutually connected with
        </p>
      </div>

      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "80px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ animation: "spin 1s linear infinite" }}
            >
              <circle cx="12" cy="12" r="10" stroke="#e2e8f0" strokeWidth="3" />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
              Loading connections...
            </p>
          </div>
        </div>
      )}

      {!loading && connections.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#f1f5f9",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="9" cy="7" r="4" stroke="#94a3b8" strokeWidth="1.5" />
              <path
                d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#475569",
              margin: "0 0 6px",
            }}
          >
            No connections yet
          </p>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
            When you and another user both accept, they'll appear here.
          </p>
        </div>
      )}

      {!loading && connections.length > 0 && (
        <>
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 20,
                padding: "5px 14px",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="9" cy="7" r="4" stroke="#3b82f6" strokeWidth="2" />
                <path
                  d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#1d4ed8" }}>
                {connections.length}{" "}
                {connections.length === 1 ? "connection" : "connections"}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 14,
            }}
          >
            {connections.map((conn) => {
              const other = getOtherUser(conn);
              const initials = other.email?.charAt(0).toUpperCase() || "U";
              const palette =
                avatarPalette[other.id % avatarPalette.length] ||
                avatarPalette[0];
              const connectedOn = new Date(conn.createdAt).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                },
              );

              return (
                <div
                  key={conn.id}
                  style={{
                    background: "#ffffff",
                    border: "1.5px solid #f1f5f9",
                    borderRadius: 16,
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.15s, border-color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(0,0,0,0.07)";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#f1f5f9";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        background: palette.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        fontWeight: 700,
                        color: palette.text,
                      }}
                    >
                      {initials}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        borderRadius: 20,
                        padding: "4px 10px",
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle cx="12" cy="12" r="10" fill="#22c55e" />
                        <path
                          d="M8 12l3 3 5-5"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#15803d",
                        }}
                      >
                        Connected
                      </span>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#0f172a",
                      margin: "0 0 4px",
                      wordBreak: "break-all",
                    }}
                  >
                    {other.email}
                  </h3>

                  <div
                    style={{
                      borderTop: "1px solid #f1f5f9",
                      margin: "14px 0 10px",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 5 }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          stroke="#94a3b8"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M16 2v4M8 2v4M3 10h18"
                          stroke="#94a3b8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>
                        Since {connectedOn}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        (window.location.href = `mailto:${other.email}`)
                      }
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        background: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        color: "#2563eb",
                        borderRadius: 8,
                        padding: "5px 10px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#dbeafe")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#eff6ff")
                      }
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="2"
                          y="4"
                          width="20"
                          height="16"
                          rx="2"
                          stroke="#2563eb"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M2 7l10 7 10-7"
                          stroke="#2563eb"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Message
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
