import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AppLayout() {
  const navigate = useNavigate();

  const { logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#d7ccc8] to-[#a1887f]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#6d4c41] text-white flex flex-col p-6 shadow-lg sticky top-0 h-screen">
        <h1 className="text-2xl font-bold mb-10 text-center">
          Roommate Finder
        </h1>

        <nav className="flex flex-col gap-4">
          <button
            className="text-left px-4 py-2 rounded-lg hover:bg-[#5d4037]"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="text-left px-4 py-2 rounded-lg hover:bg-[#5d4037]"
            onClick={() => navigate("/preferences")}
          >
            Set My Preferences
          </button>
          <button
            className="text-left px-4 py-2 rounded-lg hover:bg-[#5d4037]"
            onClick={() => navigate("/profile")}
          >
            My Profile
          </button>
        </nav>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="mt-auto px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* Scrollable main content */}
      <main className="flex-1 overflow-y-auto p-10">
        <Outlet />
      </main>
    </div>
  );
}
