import ThemeToggle from "../components/ThemeToggler";

function Dashboard() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6">
      <ThemeToggle />

      <h1 className="text-2xl font-bold mt-4">Welcome to Dashboard 🎉</h1>
    </div>
  );
}

export default Dashboard;
