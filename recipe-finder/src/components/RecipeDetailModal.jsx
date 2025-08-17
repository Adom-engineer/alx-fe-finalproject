// src/components/RecipeDetailModal.jsx
export default function RecipeDetailModal({ recipe, isOpen, onClose }) {
  if (!isOpen || !recipe) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const mea = recipe[`strMeasure${i}`];
    if (ing && ing.trim()) ingredients.push(`${mea?.trim() || ""} ${ing.trim()}`.trim());
  }

  const steps = recipe.strInstructions
    ? recipe.strInstructions.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-64 object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{recipe.strMeal}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {recipe.strCategory && <span>🏷 {recipe.strCategory}</span>}
              {recipe.strArea && <span>🌍 {recipe.strArea}</span>}
              {recipe.strYoutube && (
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  ▶ Watch Video
                </a>
              )}
              {recipe.strSource && (
                <a
                  href={recipe.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  ↗ Source
                </a>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {ingredients.map((item, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Instructions</h3>
              <div className="text-gray-700 leading-relaxed">
                {steps.map((step, idx) => (
                  <p key={idx} className="mb-3">
                    <span className="font-medium text-indigo-600">Step {idx + 1}:</span> {step}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
