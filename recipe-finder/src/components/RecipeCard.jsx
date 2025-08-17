// src/components/RecipeCard.jsx
export default function RecipeCard({ recipe, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
      onClick={() => onClick(recipe)}
    >
      <div className="relative">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
        {recipe.strCategory && (
          <div className="absolute top-2 right-2">
            <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
              {recipe.strCategory}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{recipe.strMeal}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{recipe.strArea ?? "—"}</span>
          <span className="text-indigo-600 font-medium">View Recipe</span>
        </div>
      </div>
    </div>
  );
}
