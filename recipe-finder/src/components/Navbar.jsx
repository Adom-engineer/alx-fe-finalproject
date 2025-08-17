function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md py-4">
      <div className="max-w-5xl mx-auto flex justify-center items-center px-4">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-indigo-600">
          Recipe Finder
        </h1>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-indigo-600 transition">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 transition">
            About
          </a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 transition">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
