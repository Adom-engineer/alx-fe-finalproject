import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center w-full max-w-3xl px-4 space-y-6">
        <SearchBar />
        <RecipeList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
