import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <SearchBar />
        <RecipeList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
