// src/components/RecipeCard.jsx
export default function RecipeCard({ recipe, onClick }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      onClick={() => onClick(recipe)}
      role="button"
      tabIndex="0"
      aria-label={`View recipe for ${recipe.strMeal}`}
    >
      {/* Image with Category Tag */}
      <div className="relative aspect-[4/3]">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover"
          loading="lazy" // Improves performance
        />
        {recipe.strCategory && (
          <span className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
            {recipe.strCategory}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-base">
          {recipe.strMeal}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          {/* Origin */}
          <span className="flex items-center gap-1">
            🌍 {recipe.strArea || "Unknown"}
          </span>
          {/* Action */}
          <span className="text-indigo-600 font-medium">View Recipe</span>
        </div>
      </div>
    </div>
  );
}