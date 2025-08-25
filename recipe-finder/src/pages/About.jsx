// src/pages/About.jsx
export default function About() {
  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold mb-4">About Recipe Finder</h1>
      <p className="text-gray-700">
  Recipe Finder lets you search meals, view ingredients, and follow step-by-step instructions.
  Built with React, Vite, Tailwind, and{" "}
  <a href="https://themealdb.com" className="text-indigo-600 hover:underline">
    TheMealDB
  </a>.
</p>
    </div>
  );
}
