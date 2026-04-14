import { useEffect, useState } from "react";
import { getAllProfiles } from "../api/profileApi";
import { getMatchSuggestions } from "../api/matchApi";
import { getMyPreferences } from "../api/preferencesApi";

export default function Dashboard() {
  const [profiles, setProfiles] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function loadProfiles() {
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
    loadProfiles();
  }, []);

  const hasSuggestions = suggestions && suggestions.length > 0;

  return (
    <div>
      <h2 className="text-3xl font-serif italic text-[#4e342e] mb-8">
        {hasSuggestions
          ? "Your Compatibility Suggestions"
          : "Discover Roommates"}
      </h2>

      {!hasSuggestions && (
        <p className="text-gray-700 mb-6 italic">
          Select your preferences to see compatibility scores with other users.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(hasSuggestions ? suggestions : profiles).map((item) => (
          <div
            key={item.userId || item.id}
            className="relative bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition flex flex-col"
          >
            {/* Compatibility score badge */}
            {item.compatibilityScore !== undefined && (
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                {item.compatibilityScore}%
              </div>
            )}
            {/* Avatar placeholder */}
            <div className="w-16 h-16 rounded-full bg-[#aed3f1] flex items-center justify-center text-[#6d4c41] font-bold text-xl mb-4">
              {(item.name && item.name.charAt(0)) || "U"}
            </div>

            {/* Name + occupation */}
            <h3 className="text-xl font-semibold text-[#4e342e] mb-1">
              {item.name}
            </h3>
            {item.age && (
              <p className="text-gray-700 text-sm mb-1">{item.age} years old</p>
            )}
            {item.city && (
              <p className="text-gray-700 text-sm mb-1">📍 {item.city}</p>
            )}
            {item.occupation && (
              <p className="text-gray-500 italic text-sm mb-2">
                {item.occupation}
              </p>
            )}

            {/* Bio */}
            {item.bio && (
              <p className="text-sm text-gray-600 mb-3">{item.bio}</p>
            )}

            {/* Compatibility score (only for suggestions)
            {item.compatibilityScore !== undefined && (
              <p className="mt-auto text-gray-700">
                Compatibility Score:{" "}
                <span className="font-bold text-[#6d4c41]">
                  {item.compatibilityScore}%
                </span>
              </p>
            )} */}

            {/* Matching preferences list */}
            {item.matchingPrefernces && item.matchingPrefernces.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-semibold text-[#4e342e] mb-2">
                  Matching Preferences:
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.matchingPrefernces.map((pref, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-[#d7ccc8] text-[#4e342e] text-xs font-medium px-3 py-1 rounded-full shadow-sm"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Connect button */}
            <button className="mt-4 bg-[#2e4cba] hover:bg-[#597cde] text-white text-sm font-medium rounded-lg px-4 py-2 transition">
              Connect +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
