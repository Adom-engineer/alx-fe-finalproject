// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: links */}
        <div className="flex items-center gap-6">
          <NavLink to="/" className={({isActive}) => isActive ? "text-indigo-600 font-semibold" : "text-gray-700 hover:text-indigo-600"}>
            Home
          </NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "text-indigo-600 font-semibold" : "text-gray-700 hover:text-indigo-600"}>
            About
          </NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? "text-indigo-600 font-semibold" : "text-gray-700 hover:text-indigo-600"}>
            Contact
          </NavLink>
        </div>

        {/* Center: logo/title */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-xl md:text-2xl font-bold text-indigo-600">Recipe Finder</h1>
        </Link>

        {/* Right: placeholder for future actions */}
        <div className="w-24 text-right">{/* space for profile/settings later */}</div>
      </div>
    </nav>
  );
}
