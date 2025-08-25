// src/components/SearchBar.jsx
export default function SearchBar({ value, onChange, onSubmit, placeholder = "Search..." }) {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 pl-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="currentColor"
          >
            <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
          </svg>
        </div>
        <button
          onClick={onSubmit}
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          Search
        </button>
      </div>
    </div>
  );
}