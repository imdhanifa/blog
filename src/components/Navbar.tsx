import { useTheme } from "../context/theme.context";
import { Sun, Moon } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const [search, setSearch] = useState(params.get("q") || "");

  useEffect(() => {
    setSearch(params.get("q") || "");
  }, [location.search]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleChange = (value: string) => {
    setSearch(value);

    // Always reset to first page on new search
    const newParams = new URLSearchParams(location.search);
    if (value) {
      newParams.set("q", value);
      newParams.set("page", "1");
    } else {
      newParams.delete("q");
      newParams.delete("page");
    }
    navigate(`/posts?${newParams.toString()}`);
  };
  return (
    <nav
      className="fixed top-0 left-0 w-full border-b border-gray-200 dark:border-gray-800
        bg-white dark:bg-black z-50"
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center gap-6">
        {/* Left - Title */}
        <h1 className="font-bold text-xl dark:text-white whitespace-nowrap">
          <Link to="/" className="hover:text-blue-500 transition">
            The Blog
          </Link>
        </h1>

        {/* Middle - Search */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            value={search}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search posts..."
            className="w-full max-w-md px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700
              bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right - Signin + Theme */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/post/new")}
            className="px-4 py-2 rounded-md bg-blue-600 dark:bg-purple-600 text-white font-medium hover:bg-blue-700 dark:hover:bg-purple-700 transition">
            Add Post
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
