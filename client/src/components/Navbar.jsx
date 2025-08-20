import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="relative bg-gradient-to-r from-black via-[#0a1a2f] to-black text-white shadow-md">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-black to-blue-900 opacity-30 blur-2xl"></div>

      <div className="container relative mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide hover:text-blue-400 transition-colors duration-300"
        >
          T's Blog
        </Link>

        <nav className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-300 hover:text-blue-400 ${
                isActive ? "text-blue-400 font-semibold" : "text-gray-200"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/new"
            className={({ isActive }) =>
              `transition-colors duration-300 hover:text-blue-400 ${
                isActive ? "text-blue-400 font-semibold" : "text-gray-200"
              }`
            }
          >
            New Post
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
