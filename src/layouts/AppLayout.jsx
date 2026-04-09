import { Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#d7ccc8] to-[#a1887f]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#6d4c41] text-white flex flex-col p-6 shadow-lg">
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
        </nav>
      </aside>

      {/* Dynamic page content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
