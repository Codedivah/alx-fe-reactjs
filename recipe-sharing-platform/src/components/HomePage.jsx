import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Clock, Heart } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  summary: string;
  image: string;
}

const HomePage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetch('/src/data.json');
        const data = await response.json();
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading recipes:', error);
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const toggleFavorite = (recipeId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(recipeId)) {
      newFavorites.delete(recipeId);
    } else {
      newFavorites.add(recipeId);
    }
    setFavorites(newFavorites);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-12 h-12 text-orange-500 animate-bounce mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading delicious recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <ChefHat className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900">Recipe Collection</h1>
          </div>
          <p className="text-gray-600 mt-2">Discover and explore amazing recipes from around the world</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(recipe.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors duration-200 ${
                      favorites.has(recipe.id)
                        ? 'text-red-500 fill-red-500'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {recipe.summary}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">30 min</span>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:shadow-lg">
                    View Recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && !loading && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No recipes found</h2>
            <p className="text-gray-500">Check back later for new delicious recipes!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;