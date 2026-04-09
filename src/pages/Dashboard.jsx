import { useEffect, useState } from "react";
import { getAllProfiles } from "../api/profileApi";
import { getMatchSuggestions } from "../api/matchApi";
import { getMyPreferences } from "../api/preferencesApi";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [profiles, setProfiles] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

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
    <div className="flex min-h-screen bg-gradient-to-br from-[#d7ccc8] to-[#a1887f]">
      {/* Main content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-serif italic text-[#4e342e] mb-8">
          {hasSuggestions
            ? "Your Compatibility Suggestions"
            : "Discover Roommates"}
        </h2>

        {!hasSuggestions && (
          <p className="text-gray-700 mb-6 italic">
            Select your preferences to see compatibility scores with other
            users.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasSuggestions
            ? suggestions.map((s) => (
                <div
                  key={s.userId}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-semibold text-[#4e342e] mb-2">
                    {s.name}
                  </h3>
                  <p className="text-gray-700">
                    Compatibility Score:{" "}
                    <span className="font-bold text-[#6d4c41]">
                      {s.compatibilityScore}%
                    </span>
                  </p>
                </div>
              ))
            : profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-semibold text-[#4e342e] mb-2">
                    {profile.name}
                  </h3>
                  <p className="text-gray-700">{profile.city}</p>
                  <p className="text-gray-500 italic">{profile.occupation}</p>
                  <p className="text-sm text-gray-600 mt-2">{profile.bio}</p>
                </div>
              ))}
        </div>
      </main>
    </div>
  );
}
