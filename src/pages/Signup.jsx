import { useState } from "react";
import { signup } from "../api/authApi"; // <-- make sure you have this API function
import { useNavigate } from "react-router-dom";
import loginPageImage from "../assets/loginPageImage.jpg";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await signup(form);
      console.log("Signup successful");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with image */}
      <div className="w-1/2">
        <img
          src={loginPageImage}
          alt="Signup Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side with signup form */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-[#d7ccc8] to-[#a1887f] p-10">
        {/* Tagline */}
        <h1 className="text-2xl italic font-serif text-[#4e342e] mb-8 text-center leading-relaxed tracking-wide">
          Start your journey — find a roommate who feels like home
        </h1>

        {/* Enlarged signup card */}
        <div className="w-full max-w-md bg-white/90 shadow-2xl rounded-xl p-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Sign Up
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] focus:border-[#6d4c41] transition"
              placeholder="Full Name"
              type="text"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            /> */}

            <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] focus:border-[#6d4c41] transition"
              placeholder="Email"
              type="email"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] focus:border-[#6d4c41] transition"
              placeholder="Password"
              type="password"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] focus:border-[#6d4c41] transition"
              placeholder="Confirm Password"
              type="password"
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button className="bg-[#6d4c41] hover:bg-[#5d4037] text-white font-medium rounded-lg p-3 transition">
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-700 mt-6 text-center">
            Already have an account?{" "}
            <a href="/" className="text-[#6d4c41] hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
