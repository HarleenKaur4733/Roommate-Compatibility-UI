import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createMyPreferences,
  getMyPreferences,
  updateMyPreferences,
} from "../api/preferencesApi";

const fields = {
  lifestyle: [
    {
      name: "sleepSchedule",
      label: "Sleep schedule",
      type: "select",
      options: [
        { value: "EARLY_SLEEPER", label: "Early bird" },
        { value: "LATE_SLEEPER", label: "Night owl" },
        { value: "FLEXIBLE", label: "Flexible" },
      ],
    },
    {
      name: "workMode",
      label: "Work mode",
      type: "select",
      options: [
        { value: "WFH", label: "Work from home" },
        { value: "OFFICE", label: "Office" },
        { value: "HYBRID", label: "Hybrid" },
      ],
    },
    {
      name: "foodHabit",
      label: "Food habit",
      type: "select",
      options: [
        { value: "VEGETARIAN", label: "Vegetarian" },
        { value: "NON_VEGETARIAN", label: "Non-vegetarian" },
        { value: "VEGAN", label: "Vegan" },
        { value: "ANY", label: "Any" },
      ],
    },
    {
      name: "guestFrequency",
      label: "Guest frequency",
      type: "select",
      options: [
        { value: "NEVER", label: "Never" },
        { value: "OCCASIONAL", label: "Occasional" },
        { value: "FREQUENT", label: "Frequent" },
      ],
    },
  ],
  habits: [
    {
      name: "smokingPreference",
      label: "Smoking",
      type: "select",
      options: [
        { value: "NO", label: "No" },
        { value: "YES", label: "Yes" },
        { value: "OCCASIONALLY", label: "Occasionally" },
      ],
    },
    {
      name: "drinkingPreference",
      label: "Drinking",
      type: "select",
      options: [
        { value: "NO", label: "No" },
        { value: "YES", label: "Yes" },
        { value: "OCCASIONALLY", label: "Occasionally" },
      ],
    },
    {
      name: "cleanlinessLevel",
      label: "Cleanliness level",
      type: "select",
      options: [
        { value: "HIGH", label: "High" },
        { value: "MEDIUM", label: "Medium" },
        { value: "LOW", label: "Low" },
      ],
    },
    {
      name: "budget",
      label: "Max monthly budget (₹)",
      type: "budget",
    },
  ],
};

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-slate-200 text-[13px] text-slate-900 bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all";

export default function Preferences() {
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const handleChange = (e) =>
    setPreferences({ ...preferences, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditMode) {
        await updateMyPreferences(preferences);
      } else {
        await createMyPreferences(preferences);
      }
      navigate("/dashboard");
    } finally {
      setSaving(false);
    }
  };

  const renderField = ({ name, label, type, options }) => (
    <div key={name} className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium text-slate-500">{label}</label>
      {type === "select" ? (
        <select
          name={name}
          value={preferences[name] || ""}
          onChange={handleChange}
          className={`${inputClass} appearance-none cursor-pointer`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2394a3b8' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            paddingRight: "32px",
          }}
        >
          <option value="">Select...</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-slate-400 pointer-events-none">
            ₹
          </span>
          <input
            name={name}
            type="number"
            placeholder="e.g. 15000"
            value={preferences[name] || ""}
            onChange={handleChange}
            className={`${inputClass} pl-6`}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Page header */}
        <div className="mb-5">
          <h2 className="text-[18px] font-medium text-slate-900">
            Preferences
          </h2>
          <p className="text-[13px] text-slate-400 mt-0.5">
            We use these to find your most compatible roommates
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white border border-slate-200 rounded-xl px-7 py-6 space-y-6">
            {/* Info note */}
            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
              <svg
                viewBox="0 0 14 14"
                fill="none"
                width="14"
                height="14"
                className="mt-0.5 flex-shrink-0"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="6"
                  stroke="#3b82f6"
                  strokeWidth="1.1"
                />
                <path
                  d="M7 6.5V10"
                  stroke="#3b82f6"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <circle cx="7" cy="4.5" r="0.6" fill="#3b82f6" />
              </svg>
              <p className="text-[12px] text-blue-700 leading-relaxed">
                Filling all fields helps the algorithm calculate a more accurate
                compatibility score for you.
              </p>
            </div>

            {/* Lifestyle section */}
            <div>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-3">
                Lifestyle
              </p>
              <div className="grid grid-cols-2 gap-4">
                {fields.lifestyle.map(renderField)}
              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* Habits section */}
            <div>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-3">
                Habits
              </p>
              <div className="grid grid-cols-2 gap-4">
                {fields.habits.map(renderField)}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-[13px] font-medium text-slate-500 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-[13px] font-medium disabled:opacity-60 transition-all active:scale-[0.98]"
              >
                {saving
                  ? "Saving..."
                  : isEditMode
                    ? "Update preferences"
                    : "Save preferences"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
