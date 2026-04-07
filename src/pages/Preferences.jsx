import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMyPreferences } from "../api/preferencesApi";

function Preferences() {
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState({
    budgetMin: "",
    budgetMax: "",
    sleepSchedule: "",
    smokingPreference: "",
    cleanliness: "",
    foodPreference: "",
    drinking: "",
    guestFrequency: "",
    workMode: "",
  });

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMyPreferences(preferences);
    console.log("Preferences saved successfully");
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
                name="budgetMin"
                placeholder="Min"
                onChange={handleChange}
                className="border rounded-lg p-2 w-1/2 focus:ring-2 focus:ring-[#6d4c41]"
              />
              <input
                name="budgetMax"
                placeholder="Max"
                onChange={handleChange}
                className="border rounded-lg p-2 w-1/2 focus:ring-2 focus:ring-[#6d4c41]"
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
              name="cleanliness"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#6d4c41]"
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
              name="foodPreference"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#6d4c41]"
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
              name="drinking"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#6d4c41]"
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
            >
              <option value="">Select...</option>
              <option value="WFH">Work From Home</option>
              <option value="OFFICE">Office</option>
              <option value="HYBRID">Hybrid</option>
            </select>
          </div>
        </div>

        <button className="mt-8 bg-[#6d4c41] hover:bg-[#5d4037] text-white font-medium rounded-lg py-3 transition w-full">
          Save Preferences
        </button>
      </form>
    </div>
  );
}

export default Preferences;
