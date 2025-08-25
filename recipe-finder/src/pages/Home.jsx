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
    const promises = Array.from({ length: 12 }, async () => {
      const r = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const d = await r.json();
      return d.meals[0];
    });
    const randomMeals = await Promise.all(promises);
    setRecipes(randomMeals);
  } catch (e) {
    console.error("Error fetching random recipes:", e);
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
      meals.slice(0, 12).map(async (m) => {
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