import { useEffect, useState, useContext } from "react";
import { getAllProfiles } from "../api/profileApi";
import { getMatchSuggestions } from "../api/matchApi";
import { getMyPreferences } from "../api/preferencesApi";
import {
  getSentRequests,
  sendMatchRequest,
  getMyRequests,
  acceptMatchRequest,
  rejectMatchRequest,
} from "../api/matchRequestApi";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [sentRequests, setSentRequests] = useState(new Set());
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("discover"); // "discover" | "requests"
  const [actionLoading, setActionLoading] = useState({});

  const handleSendRequest = async (userId) => {
    try {
      await sendMatchRequest(userId);
      setSentRequests((prev) => new Set(prev).add(userId));
    } catch {
      alert("Request already sent or failed.");
    }
  };

  const handleAccept = async (requestId, senderId) => {
    setActionLoading((prev) => ({ ...prev, [requestId]: "accepting" }));
    try {
      await acceptMatchRequest(requestId);
      setIncomingRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch {
      alert("Failed to accept request.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [requestId]: null }));
    }
  };

  const handleReject = async (requestId) => {
    setActionLoading((prev) => ({ ...prev, [requestId]: "rejecting" }));
    try {
      await rejectMatchRequest(requestId);
      setIncomingRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch {
      alert("Failed to reject request.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [requestId]: null }));
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const sentRes = await getSentRequests();
        const alreadySentIds = new Set(sentRes.data.map((r) => r.receiver.id));
        setSentRequests(alreadySentIds);
      } catch {}

      try {
        const reqRes = await getMyRequests();
        setIncomingRequests(reqRes.data.filter((r) => r.status === "PENDING"));
      } catch {}

      try {
        await getMyPreferences();
        const res = await getMatchSuggestions();
        setSuggestions(res.data);
        setProfiles(res.data);
      } catch {
        const res = await getAllProfiles();
        setProfiles(res.data);
      }
    }
    loadData();
  }, []);

  const hasSuggestions = suggestions && suggestions.length > 0;
  const displayList = hasSuggestions ? suggestions : profiles;

  const getInitials = (email) => (email ? email.charAt(0).toUpperCase() : "U");

  return (
    <div
      style={{
        padding: "32px 32px",
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#0f172a",
              margin: 0,
              letterSpacing: -0.3,
            }}
          >
            {hasSuggestions
              ? "Your compatibility suggestions"
              : "Discover roommates"}
          </h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>
            {hasSuggestions
              ? "Matched based on your lifestyle preferences"
              : "Set your preferences to see compatibility scores"}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {incomingRequests.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#fef3c7",
                border: "1px solid #fde68a",
                borderRadius: 20,
                padding: "5px 12px",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#f59e0b",
                }}
              />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#92400e" }}>
                {incomingRequests.length} pending{" "}
                {incomingRequests.length === 1 ? "request" : "requests"}
              </span>
            </div>
          )}
          {displayList.length > 0 && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                background: "#eff6ff",
                color: "#1d4ed8",
                padding: "5px 12px",
                borderRadius: 20,
              }}
            >
              {displayList.length}{" "}
              {displayList.length === 1 ? "match" : "matches"}
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid #e2e8f0",
          marginTop: 20,
          marginBottom: 24,
        }}
      >
        {[
          { key: "discover", label: "Discover" },
          {
            key: "requests",
            label: "Requests",
            badge: incomingRequests.length,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "10px 18px",
              fontSize: 13,
              fontWeight: 500,
              border: "none",
              background: "none",
              cursor: "pointer",
              borderBottom:
                activeTab === tab.key
                  ? "2px solid #3b82f6"
                  : "2px solid transparent",
              color: activeTab === tab.key ? "#3b82f6" : "#64748b",
              marginBottom: -1,
              transition: "all 0.15s",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {tab.label}
            {tab.badge > 0 && (
              <span
                style={{
                  background: "#ef4444",
                  color: "white",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "1px 6px",
                  borderRadius: 99,
                  lineHeight: "16px",
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── DISCOVER TAB ── */}
      {activeTab === "discover" && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {displayList.map((item) => {
              const userId = item.userId || item.id;
              const initials = item.name
                ? item.name.charAt(0).toUpperCase()
                : "U";
              const isRequestSent = sentRequests.has(userId);
              const score = item.compatibilityScore;

              const scoreColor =
                score >= 70 ? "#16a34a" : score >= 40 ? "#2563eb" : "#9ca3af";
              const scoreBg =
                score >= 70 ? "#f0fdf4" : score >= 40 ? "#eff6ff" : "#f9fafb";
              const scoreBorder =
                score >= 70 ? "#bbf7d0" : score >= 40 ? "#bfdbfe" : "#e5e7eb";

              return (
                <div
                  key={userId}
                  style={{
                    background: "#ffffff",
                    border: "1.5px solid #f1f5f9",
                    borderRadius: 16,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.15s, border-color 0.15s",
                    position: "relative",
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
                  {/* Score badge */}
                  {score !== undefined && (
                    <div
                      style={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        background: scoreBg,
                        border: `1.5px solid ${scoreBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: scoreColor,
                        }}
                      >
                        {score}%
                      </span>
                    </div>
                  )}

                  {/* Avatar */}
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#1d4ed8",
                      marginBottom: 12,
                    }}
                  >
                    {initials}
                  </div>

                  {/* Name + meta */}
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#0f172a",
                      margin: "0 0 3px",
                    }}
                  >
                    {item.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 2,
                    }}
                  >
                    {item.city && (
                      <>
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#60a5fa",
                            display: "inline-block",
                          }}
                        />
                        <span style={{ fontSize: 12, color: "#64748b" }}>
                          {item.city}
                        </span>
                      </>
                    )}
                    {item.city && item.age && (
                      <span style={{ color: "#cbd5e1", fontSize: 12 }}>·</span>
                    )}
                    {item.age && (
                      <span style={{ fontSize: 12, color: "#64748b" }}>
                        {item.age} yrs
                      </span>
                    )}
                  </div>
                  {item.occupation && (
                    <p
                      style={{
                        fontSize: 12,
                        color: "#94a3b8",
                        fontStyle: "italic",
                        margin: "0 0 10px",
                      }}
                    >
                      {item.occupation}
                    </p>
                  )}
                  {item.bio && (
                    <p
                      style={{
                        fontSize: 13,
                        color: "#475569",
                        lineHeight: 1.6,
                        margin: "0 0 12px",
                        flex: 1,
                      }}
                    >
                      {item.bio}
                    </p>
                  )}

                  <div
                    style={{
                      borderTop: "1px solid #f1f5f9",
                      margin: "8px 0 12px",
                    }}
                  />

                  {/* Preference pills */}
                  {item.matchingPrefernces?.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        marginBottom: 14,
                      }}
                    >
                      {item.matchingPrefernces.map((pref, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            background: "#f5f3ff",
                            color: "#6d28d9",
                            padding: "3px 10px",
                            borderRadius: 99,
                          }}
                        >
                          {pref}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  {isRequestSent ? (
                    <button
                      disabled
                      style={{
                        width: "100%",
                        padding: "9px",
                        borderRadius: 9,
                        fontSize: 13,
                        fontWeight: 500,
                        background: "#f8fafc",
                        border: "1.5px solid #e2e8f0",
                        color: "#94a3b8",
                        cursor: "not-allowed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#94a3b8"
                          strokeWidth="2"
                        />
                        <path
                          d="M8 12l3 3 5-5"
                          stroke="#94a3b8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Request sent
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSendRequest(userId)}
                      style={{
                        width: "100%",
                        padding: "9px",
                        borderRadius: 9,
                        fontSize: 13,
                        fontWeight: 600,
                        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        transition: "opacity 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.88")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      Connect +
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {displayList.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#f1f5f9",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
                No profiles found.
              </p>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>
                Try updating your preferences.
              </p>
            </div>
          )}
        </>
      )}

      {/* ── REQUESTS TAB ── */}
      {activeTab === "requests" && (
        <>
          {incomingRequests.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#f1f5f9",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
                No pending requests
              </p>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>
                When someone wants to connect, you'll see them here.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                maxWidth: 680,
              }}
            >
              {incomingRequests.map((req) => {
                const sender = req.sender;
                const initials = sender.email?.charAt(0).toUpperCase() || "U";
                const isAccepting = actionLoading[req.id] === "accepting";
                const isRejecting = actionLoading[req.id] === "rejecting";

                return (
                  <div
                    key={req.id}
                    style={{
                      background: "#ffffff",
                      border: "1.5px solid #f1f5f9",
                      borderRadius: 14,
                      padding: "18px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#1d4ed8",
                      }}
                    >
                      {initials}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#0f172a",
                          margin: "0 0 2px",
                        }}
                      >
                        {sender.email}
                      </p>
                      <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>
                        Sent a connection request ·{" "}
                        {new Date(req.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Pending pill */}
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        background: "#fef3c7",
                        color: "#92400e",
                        padding: "3px 10px",
                        borderRadius: 99,
                        flexShrink: 0,
                      }}
                    >
                      Pending
                    </span>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                      <button
                        onClick={() => handleReject(req.id)}
                        disabled={isAccepting || isRejecting}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 500,
                          background: "#fff",
                          border: "1.5px solid #e2e8f0",
                          color: "#64748b",
                          cursor: isRejecting ? "not-allowed" : "pointer",
                          opacity: isRejecting ? 0.6 : 1,
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          if (!isRejecting) {
                            e.currentTarget.style.borderColor = "#fca5a5";
                            e.currentTarget.style.color = "#ef4444";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#e2e8f0";
                          e.currentTarget.style.color = "#64748b";
                        }}
                      >
                        {isRejecting ? "Declining..." : "Decline"}
                      </button>
                      <button
                        onClick={() => handleAccept(req.id, sender.id)}
                        disabled={isAccepting || isRejecting}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 600,
                          background:
                            "linear-gradient(135deg, #3b82f6, #2563eb)",
                          border: "none",
                          color: "white",
                          cursor: isAccepting ? "not-allowed" : "pointer",
                          opacity: isAccepting ? 0.7 : 1,
                          transition: "opacity 0.15s",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        {isAccepting ? (
                          <>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              style={{ animation: "spin 1s linear infinite" }}
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="rgba(255,255,255,0.3)"
                                strokeWidth="3"
                              />
                              <path
                                d="M12 2a10 10 0 0 1 10 10"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                              />
                            </svg>
                            Accepting...
                          </>
                        ) : (
                          "Accept"
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
