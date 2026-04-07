import { useState, useContext } from "react";
import { login } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import loginPageImage from "../assets/loginPageImage.jpg";

function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form);
      loginUser(res.data.accessToken);
      console.log("Login successful");
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with image */}
      <div className="w-1/2">
        <img
          src={loginPageImage}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side with login form */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-[#d7ccc8] to-[#a1887f] p-10">
        {/* Tagline */}
        <h1 className="text-2xl italic font-serif text-[#4e342e] mb-8 text-center leading-relaxed tracking-wide">
          Discover roommates who truly fit your vibe
        </h1>

        {/* Enlarged login card */}
        <div className="w-full max-w-md bg-white/90 shadow-2xl rounded-xl p-10">
          <h2 className="text-1xl font-semibold text-gray-800 mb-6 text-center">
            Login
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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

            <button className="bg-[#6d4c41] hover:bg-[#5d4037] text-white font-medium rounded-lg p-3 transition">
              Login
            </button>
          </form>

          <p className="text-sm text-gray-700 mt-6 text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[#6d4c41] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
