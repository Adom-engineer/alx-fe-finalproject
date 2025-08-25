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

  async function fetchCategories() {
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (e) {
      console.error("Error fetching categories:", e);
    }
  }

  async function fetchRandomRecipes() {
    setLoading(true);
    try {
      const promises = Array.from({ length: 8 }, async () => {
        const r = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const d = await r.json();
        return d.meals?.[0] || null;
      });
      const results = await Promise.all(promises);
      setRecipes(results.filter(Boolean));
    } catch (e) {
      console.error("Error fetching random recipes:", e);
    } finally {
      setLoading(false);
    }
  }

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
        meals.slice(0, 8).map(async (m) => {
          const r = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`);
          const d = await r.json();
          return d.meals?.[0] ?? m;
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
      {/* Hero */}
      <header className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Recipe Finder</h1>
          <p className="text-lg opacity-90 mb-6">Discover delicious recipes from around the world</p>

          <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto">
            <SearchBar
              value={searchTerm}
              onChange={(v) => setSearchTerm(v)}
              onSubmit={handleSearchSubmit}
              placeholder="Search for recipes..."
            />
          </form>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Browse by Category</h2>
          <div className="flex flex-wrap gap-2 justify-center">
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
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
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

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
            <p className="mt-3 text-gray-600">Loading recipes...</p>
          </div>
        )}

        {/* Grid */}
        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
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