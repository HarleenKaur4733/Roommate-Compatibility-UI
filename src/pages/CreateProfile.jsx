import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { createProfile } from "../api/profileApi";

function CreateProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    age: "",
    occupation: "",
    city: "",
    bio: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProfile(profile);
    console.log("Profile created successfully");
    navigate("/preferences");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#d7ccc8] to-[#a1887f] p-10">
      <div className="w-full max-w-lg bg-white/90 shadow-2xl rounded-xl p-10">
        <h1 className="text-3xl  text-[#4e342e] mb-1 text-center leading-relaxed tracking-wide">
          Tell us about yourself!
        </h1>
        <p className="text-gray-700 mb-8 text-center italic font-serif">
          This helps us find the best roommate matches for you!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] focus:border-[#6d4c41] transition"
            placeholder="Name"
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
          />

          <input
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] focus:border-[#6d4c41] transition"
            placeholder="Age"
            type="number"
            onChange={(e) =>
              setProfile({
                ...profile,
                age: e.target.value,
              })
            }
          />

          <input
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] focus:border-[#6d4c41] transition"
            placeholder="Occupation"
            onChange={(e) =>
              setProfile({
                ...profile,
                occupation: e.target.value,
              })
            }
          />

          <input
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] focus:border-[#6d4c41] transition"
            placeholder="City"
            onChange={(e) =>
              setProfile({
                ...profile,
                city: e.target.value,
              })
            }
          />

          <textarea
            className="border border-gray-300 rounded-lg p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#6d4c41] focus:border-[#6d4c41] transition"
            placeholder="Bio"
            onChange={(e) =>
              setProfile({
                ...profile,
                bio: e.target.value,
              })
            }
          />

          <button className="bg-[#6d4c41] hover:bg-[#5d4037] text-white font-medium rounded-lg p-3 transition">
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProfile;
