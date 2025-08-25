// src/pages/Home.jsx
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import RecipeDetailModal from "../components/RecipeDetailModal";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchRandomRecipes();
  }, []);

  // Fetch categories
  async function fetchCategories() {
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (e) {
      console.error("Error fetching categories:", e);
    }
  }

  // Fetch 12 random recipes
  async function fetchRandomRecipes() {
    setLoading(true);
    try {
      const promises = Array.from({ length: 12 }, async () => {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await res.json();
        return data.meals?.[0] || null;
      });
      const results = await Promise.all(promises);
      setRecipes(results.filter(Boolean)); // Remove any nulls
    } catch (e) {
      console.error("Error fetching random recipes:", e);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }

  // Search recipes by name
  async function searchRecipes(query) {
    if (!query.trim()) {
      fetchRandomRecipes();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (e) {
      console.error("Error searching recipes:", e);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }

  // Filter by category with full details
  async function filterByCategory(category) {
    if (!category) {
      fetchRandomRecipes();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`);
      const data = await res.json();
      const meals = data.meals || [];

      const detailed = await Promise.all(
        meals.slice(0, 12).map(async (m) => {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`);
          const data = await res.json();
          return data.meals?.[0] ?? m;
        })
      );
      setRecipes(detailed);
    } catch (e) {
      console.error("Error filtering by category:", e);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    searchRecipes(searchTerm);
    setSelectedCategory("");
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
    setSearchTerm("");
    filterByCategory(category);
  }

  function openRecipeDetail(recipe) {
    setSelectedRecipe(recipe);
    setShowModal(true);
  }

  function closeRecipeDetail() {
    setShowModal(false);
    setSelectedRecipe(null);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Gradient */}
      <header className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-2">
            🍽️ Recipe Finder
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">Discover delicious recipes from around the world</p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for recipes..."
                className="w-full px-4 py-3 pl-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
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
              type="submit"
              className="bg-white text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Browse by Category</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => handleCategoryClick("")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              All Recipes
            </button>
            {categories.slice(0, 8).map((c) => (
              <button
                key={c.idCategory}
                onClick={() => handleCategoryClick(c.strCategory)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === c.strCategory
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                }`}
              >
                {c.strCategory}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
            <p className="mt-3 text-gray-600">Loading recipes...</p>
          </div>
        )}

        {/* Recipe Grid */}
        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((r) => (
              <RecipeCard key={r.idMeal} recipe={r} onClick={openRecipeDetail} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && recipes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No recipes found</h3>
            <p className="text-gray-500">Try a different search or pick a category.</p>
          </div>
        )}
      </main>

      {/* Modal */}
      <RecipeDetailModal recipe={selectedRecipe} isOpen={showModal} onClose={closeRecipeDetail} />
    </div>
  );
}