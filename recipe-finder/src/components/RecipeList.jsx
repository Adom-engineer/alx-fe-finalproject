function RecipeList() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recipe Cards will go here later */}
        <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
          <h3 className="font-bold">Sample Recipe</h3>
          <p className="text-sm text-gray-600">Short description...</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeList;
