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
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with brown gradient and text */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-[#a1887f] to-[#6d4c41] text-white p-12">
        <h1 className="text-4xl font-bold mb-6 italic font-serif">
          Oasis of Roommates
        </h1>
        <p className="text-lg leading-relaxed max-w-md text-center">
          “Good roommates make a house feel like home.” <br />
          “Shared laughter is the best furniture.” <br />
          “Find harmony in living, find comfort in home.”
        </p>
        <p className="mt-10 text-sm opacity-80">Step 01/03 — Profile Info</p>
      </div>

      {/* Right side with form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50 p-12">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-10">
          <h2 className="text-2xl font-semibold text-[#4e342e] mb-2 text-center">
            Tell us about yourself!
          </h2>
          <p className="text-gray-600 mb-6 text-center italic">
            This helps us find the best roommate matches for you.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition"
              placeholder="Name"
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />

            <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition"
              placeholder="Age"
              type="number"
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
            />

            <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition"
              placeholder="Occupation"
              onChange={(e) =>
                setProfile({ ...profile, occupation: e.target.value })
              }
            />

            <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition"
              placeholder="City"
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            />

            <textarea
              className="border border-gray-300 rounded-lg p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition"
              placeholder="Bio"
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />

            <button className="bg-[#6d4c41] hover:bg-[#5d4037] text-white font-medium rounded-lg p-3 transition">
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProfile;
