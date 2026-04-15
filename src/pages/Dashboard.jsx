import { useEffect, useState } from "react";
import { getAllProfiles } from "../api/profileApi";
import { getMatchSuggestions } from "../api/matchApi";
import { getMyPreferences } from "../api/preferencesApi";
import { getSentRequests, sendMatchRequest } from "../api/matchRequestApi";

export default function Dashboard() {
  const [profiles, setProfiles] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [sentRequests, setSentRequests] = useState(new Set());

  const handleSendRequest = async (userId) => {
    try {
      await sendMatchRequest(userId);
      setSentRequests((prev) => new Set(prev).add(userId));
    } catch {
      alert("Request already sent or failed.");
    }
  };

  useEffect(() => {
    async function loadData() {
      // 1. Pre-populate already-sent requests from DB
      try {
        const sentRes = await getSentRequests();
        const alreadySentIds = new Set(
          sentRes.data.map((r) => r.receiver.id), // 👈 extract receiver.id from each request
        );
        setSentRequests(alreadySentIds);
      } catch {
        // silently fail — don't block profile loading
      }

      // 2. Load profiles / suggestions
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

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      {/* Page header */}
      <div className="flex items-end justify-between mb-1">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
            {hasSuggestions
              ? "Your compatibility suggestions"
              : "Discover roommates"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {hasSuggestions
              ? "Matched based on your lifestyle preferences"
              : "Set your preferences to see compatibility scores"}
          </p>
        </div>
        {displayList.length > 0 && (
          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">
            {displayList.length}{" "}
            {displayList.length === 1 ? "match" : "matches"}
          </span>
        )}
      </div>

      <div className="border-t border-gray-100 mt-4 mb-6" />

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayList.map((item) => {
          const userId = item.userId || item.id;
          const initials = item.name ? item.name.charAt(0).toUpperCase() : "U";
          const isRequestSent = sentRequests.has(userId);

          return (
            <div
              key={userId}
              className="relative bg-white border border-gray-100 rounded-2xl p-5 flex flex-col hover:border-gray-300 hover:shadow-sm transition-all duration-150"
            >
              {/* Compatibility score */}
              {item.compatibilityScore !== undefined && (
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-green-800">
                    {item.compatibilityScore}%
                  </span>
                </div>
              )}

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-800 font-semibold text-lg mb-3">
                {initials}
              </div>

              {/* Name + meta */}
              <h3 className="text-[15px] font-semibold text-gray-900 mb-0.5">
                {item.name}
              </h3>
              <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mb-0.5">
                {item.city && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                    <span>{item.city}</span>
                  </>
                )}
                {item.city && item.age && (
                  <span className="text-gray-300">·</span>
                )}
                {item.age && <span>{item.age} yrs</span>}
              </div>
              {item.occupation && (
                <p className="text-[12px] text-gray-400 italic mb-3">
                  {item.occupation}
                </p>
              )}

              {/* Bio */}
              {item.bio && (
                <p className="text-[13px] text-gray-600 leading-relaxed mb-3 flex-1">
                  {item.bio}
                </p>
              )}

              {/* Divider */}
              <div className="border-t border-gray-100 my-3" />

              {/* Preference pills */}
              {item.matchingPrefernces &&
                item.matchingPrefernces.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.matchingPrefernces.map((pref, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-purple-50 text-purple-800 px-2.5 py-1 rounded-full"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                )}

              {/* CTA button */}
              {isRequestSent ? (
                <button
                  disabled
                  className="w-full py-2.5 rounded-lg text-[13px] font-medium text-gray-400 bg-gray-50 border border-gray-200 cursor-not-allowed"
                >
                  Request sent
                </button>
              ) : (
                <button
                  onClick={() => handleSendRequest(userId)}
                  className="w-full py-2.5 rounded-lg text-[13px] font-medium text-blue-50 bg-blue-700 hover:bg-blue-600 active:scale-[0.98] transition-all"
                >
                  Connect +
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {displayList.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-sm">
            No profiles found. Try updating your preferences.
          </p>
        </div>
      )}
    </div>
  );
}
