import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createMyPreferences,
  getMyPreferences,
  updateMyPreferences,
} from "../api/preferencesApi";

function Preferences() {
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState({
    budget: "",
    sleepSchedule: "",
    smokingPreference: "",
    cleanlinessLevel: "",
    foodHabit: "",
    drinkingPreference: "",
    guestFrequency: "",
    workMode: "",
  });

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    async function loadPreferences() {
      try {
        const res = await getMyPreferences();

        setPreferences(res.data);

        setIsEditMode(true);
      } catch {
        setIsEditMode(false);
      }
    }

    loadPreferences();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      await updateMyPreferences(preferences);
      console.log("Preferences updated");
    } else {
      await createMyPreferences(preferences);
      console.log("Preferences created");
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#d7ccc8] to-[#a1887f] p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 p-10 rounded-xl shadow-2xl w-full max-w-4xl"
      >
        <h2 className="text-3xl italic font-serif text-[#4e342e] mb-8 text-center">
          Set Your Preferences
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget */}
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-[#4e342e] mb-2">
              💰 Budget
            </h3>
            <div className="flex gap-3">
              <input
                name="budget"
                placeholder="Max Budget"
                onChange={handleChange}
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-[#6d4c41]"
                value={preferences.budget || ""}
              />
            </div>
          </div>

          {/* Sleep Schedule */}
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-[#4e342e] mb-2">
              🌙 Sleep Schedule
            </h3>
            <select
              name="sleepSchedule"
              value={preferences.sleepSchedule || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#6d4c41]"
            >
              <option value="">Select...</option>
              <option value="EARLY_SLEEPER">Early Bird</option>
              <option value="LATE_SLEEPER">Night Owl</option>
              <option value="FLEXIBLE">Flexible</option>
            </select>
          </div>

          {/* Smoking */}
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-[#4e342e] mb-2">
              🚭 Smoking
            </h3>
            <select
              name="smokingPreference"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#6d4c41]"
              value={preferences.smokingPreference || ""}
            >
              <option value="">Select...</option>
              <option value="NO">No</option>
              <option value="YES">Yes</option>
              <option value="OCCASIONALLY">Occasionally</option>
            </select>
          </div>

          {/* Cleanliness */}
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-[#4e342e] mb-2">
              🧹 Cleanliness
            </h3>
            <select
              name="cleanlinessLevel"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#6d4c41]"
              value={preferences.cleanlinessLevel || ""}
            >
              <option value="">Select...</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          {/* Food Preference */}
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-[#4e342e] mb-2">
              🍽️ Food Preference
            </h3>
            <select
              name="foodHabit"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#6d4c41]"
              value={preferences.foodHabit || ""}
            >
              <option value="">Select...</option>
              <option value="VEG">Veg</option>
              <option value="NON_VEG">Non-Veg</option>
              <option value="VEGAN">Vegan</option>
              <option value="ANY">Any</option>
            </select>
          </div>

          {/* Drinking */}
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-[#4e342e] mb-2">
              🍷 Drinking
            </h3>
            <select
              name="drinkingPreference"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#6d4c41]"
              value={preferences.drinkingPreference || ""}
            >
              <option value="">Select...</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
              <option value="OCCASIONALLY">Occasionally</option>
            </select>
          </div>

          {/* Guest Frequency */}
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-[#4e342e] mb-2">
              👥 Guest Frequency
            </h3>
            <select
              name="guestFrequency"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#6d4c41]"
              value={preferences.guestFrequency || ""}
            >
              <option value="">Select...</option>
              <option value="NEVER">Never</option>
              <option value="FREQUENT">Frequent</option>
              <option value="OCCASIONAL">Occasional</option>
            </select>
          </div>

          {/* Work Mode */}
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-[#4e342e] mb-2">
              🏠 Work Mode
            </h3>
            <select
              name="workMode"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#6d4c41]"
              value={preferences.workMode || ""}
            >
              <option value="">Select...</option>
              <option value="WFH">Work From Home</option>
              <option value="OFFICE">Office</option>
              <option value="HYBRID">Hybrid</option>
            </select>
          </div>
        </div>

        <button className="mt-8 bg-[#6d4c41] text-white rounded-lg py-3 w-full">
          {isEditMode ? "Update Preferences" : "Save Preferences"}
        </button>
      </form>
    </div>
  );
}

export default Preferences;
