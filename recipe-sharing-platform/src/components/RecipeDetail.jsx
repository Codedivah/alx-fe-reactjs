import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, ChefHat, Heart } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  summary: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
}

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const response = await fetch('/src/data.json');
        const recipes: Recipe[] = await response.json();
        const foundRecipe = recipes.find(r => r.id === parseInt(id || '0'));
        setRecipe(foundRecipe || null);
        setLoading(false);
      } catch (error) {
        console.error('Error loading recipe:', error);
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-12 h-12 text-orange-500 animate-bounce mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading recipe details...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Recipe not found</h2>
          <p className="text-gray-500 mb-6">The recipe you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Recipes</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Recipes</span>
          </Link>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {recipe.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {recipe.summary}
              </p>
            </div>
            <button
              onClick={toggleFavorite}
              className="ml-4 p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              aria-label="Add to favorites"
            >
              <Heart
                className={`w-6 h-6 transition-colors duration-200 ${
                  isFavorite
                    ? 'text-red-500 fill-red-500'
                    : 'text-gray-400 hover:text-red-500'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image and Quick Info */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recipe Info</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Cook Time</p>
                    <p className="text-gray-600">{recipe.cookTime}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Servings</p>
                    <p className="text-gray-600">{recipe.servings} people</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ChefHat className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Difficulty</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 font-bold">📝</span>
              </div>
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 font-bold">👨‍🍳</span>
              </div>
              Instructions
            </h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Back to Recipes Button */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Explore More Recipes</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;