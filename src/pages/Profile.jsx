import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProfile, updateProfile, getMyProfile } from "../api/profileApi";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    age: "",
    occupation: "",
    city: "",
    bio: "",
  });

  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (profileExists) {
      await updateProfile(profile);

      console.log("Profile updated");
    } else {
      await createProfile(profile);

      console.log("Profile created");
    }

    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d7ccc8] to-[#a1887f] flex flex-col items-center">
      {/* Cover */}
      <div className="w-full h-48 bg-[#6d4c41] relative">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-3xl font-bold text-[#6d4c41]">
            {profile.name ? profile.name.charAt(0) : "U"}
          </div>
        </div>
      </div>

      {/* Profile Card */}

      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 mt-20">
        <h2 className="text-3xl font-bold mb-6 text-[#4e342e] text-center">
          {profileExists ? "Your Profile" : "Create Profile"}
        </h2>

        {!isEditing && profileExists ? (
          <div className="space-y-4 text-center">
            <p className="text-xl font-semibold">{profile.name}</p>

            <p className="text-gray-600">{profile.age} years old</p>

            <p className="text-gray-600">{profile.occupation}</p>

            <p className="text-gray-600">{profile.city}</p>

            <p className="italic text-gray-500 mt-4">{profile.bio}</p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 bg-[#6d4c41] text-white px-6 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              value={profile.name || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />

            <input
              name="age"
              type="number"
              placeholder="Age"
              value={profile.age || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />

            <input
              name="occupation"
              placeholder="Occupation"
              value={profile.occupation || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />

            <input
              name="city"
              placeholder="City"
              value={profile.city || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />

            <textarea
              name="bio"
              placeholder="Bio"
              value={profile.bio || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />

            <button className="bg-[#6d4c41] text-white px-6 py-2 rounded-lg">
              {profileExists ? "Update Profile" : "Save Profile"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
