import { useState, useEffect } from "react";
import { createProfile, updateProfile, getMyProfile } from "../api/profileApi";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    occupation: "",
    city: "",
    bio: "",
  });
  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await getMyProfile();
        setProfile(res.data);
        setProfileExists(true);
        setIsEditing(false);
      } catch {
        setProfileExists(false);
        setIsEditing(true);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (profileExists) {
        await updateProfile(profile);
      } else {
        await createProfile(profile);
        setProfileExists(true);
      }
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const initials = profile.name ? profile.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Profile card */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {/* Cover */}
          <div className="h-36 bg-[#0f172a] relative">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
                backgroundSize: "20px 20px",
              }}
            />
            {/* Avatar */}
            <div className="absolute -bottom-7 left-8">
              <div className="w-16 h-16 rounded-full bg-blue-900 border-[3px] border-slate-50 flex items-center justify-center text-2xl font-medium text-blue-200">
                {initials}
              </div>
            </div>
          </div>

          <div className="px-8 pt-12 pb-8">
            {/* Header row */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[17px] font-medium text-slate-900 leading-none mb-1">
                  {profile.name || "Your name"}
                </h2>
                <p className="text-[13px] text-slate-500">
                  {[profile.occupation, profile.city]
                    .filter(Boolean)
                    .join(" · ") || "Complete your profile"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {profileExists && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    Active
                  </span>
                )}
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[12px] font-medium text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all"
                  >
                    <svg viewBox="0 0 12 12" fill="none" width="12" height="12">
                      <path
                        d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z"
                        stroke="currentColor"
                        strokeWidth="1.1"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Edit profile
                  </button>
                )}
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                {
                  label: "Age",
                  value: profile.age ? `${profile.age} years old` : "—",
                },
                { label: "Occupation", value: profile.occupation || "—" },
                { label: "City", value: profile.city || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg px-4 py-3">
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1">
                    {label}
                  </p>
                  <p className="text-[13px] font-medium text-slate-800">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="bg-slate-50 rounded-lg px-4 py-3">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5">
                  About
                </p>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            )}

            {!profileExists && !isEditing && (
              <p className="text-[13px] text-slate-400 italic text-center py-4">
                No profile yet. Click "Edit profile" to get started.
              </p>
            )}
          </div>
        </div>

        {/* Edit form */}
        {isEditing && (
          <div className="bg-white border border-slate-200 rounded-xl px-8 py-6">
            <div className="mb-5">
              <p className="text-[14px] font-medium text-slate-900">
                {profileExists ? "Edit profile" : "Create your profile"}
              </p>
              <p className="text-[12px] text-slate-400 mt-0.5">
                {profileExists
                  ? "Update your details to get better matches"
                  : "Fill in your details to start finding roommates"}
              </p>
            </div>

            <div className="border-t border-slate-100 mb-5" />

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* Full name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                    Full name
                  </label>
                  <input
                    name="name"
                    placeholder="e.g. Priya Sharma"
                    value={profile.name || ""}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                  />
                </div>

                {/* Age */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                    Age
                  </label>
                  <input
                    name="age"
                    type="number"
                    placeholder="e.g. 24"
                    value={profile.age || ""}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                  />
                </div>

                {/* Occupation */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                    Occupation
                  </label>
                  <input
                    name="occupation"
                    placeholder="e.g. Software Engineer"
                    value={profile.occupation || ""}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                    City
                  </label>
                  <input
                    name="city"
                    placeholder="e.g. Mumbai"
                    value={profile.city || ""}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                  />
                </div>

                {/* Bio */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    placeholder="Tell potential roommates a bit about yourself..."
                    value={profile.bio || ""}
                    onChange={handleChange}
                    rows={3}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2.5 mt-6 pt-5 border-t border-slate-100">
                {profileExists && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-[13px] font-medium text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-[13px] font-medium disabled:opacity-60 transition-all active:scale-[0.98]"
                >
                  {saving
                    ? "Saving..."
                    : profileExists
                      ? "Save changes"
                      : "Create profile"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
