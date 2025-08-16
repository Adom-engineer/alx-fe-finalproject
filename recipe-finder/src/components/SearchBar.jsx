function SearchBar() {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search recipes by ingredient or name..."
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
}

export default SearchBar;
