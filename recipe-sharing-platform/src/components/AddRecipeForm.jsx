import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChefHat, Plus, Minus, Save, AlertCircle } from 'lucide-react';

interface FormData {
  title: string;
  summary: string;
  image: string;
  cookTime: string;
  servings: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
}

interface FormErrors {
  title?: string;
  summary?: string;
  image?: string;
  cookTime?: string;
  servings?: string;
  difficulty?: string;
  ingredients?: string;
  instructions?: string;
}

const AddRecipeForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    summary: '',
    image: '',
    cookTime: '',
    servings: '',
    difficulty: 'Easy',
    ingredients: [''],
    instructions: ['']
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    // Summary validation
    if (!formData.summary.trim()) {
      newErrors.summary = 'Recipe summary is required';
    } else if (formData.summary.trim().length < 10) {
      newErrors.summary = 'Summary must be at least 10 characters long';
    }

    // Image URL validation
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid URL';
    }

    // Cook time validation
    if (!formData.cookTime.trim()) {
      newErrors.cookTime = 'Cook time is required';
    }

    // Servings validation
    if (!formData.servings.trim()) {
      newErrors.servings = 'Number of servings is required';
    } else if (isNaN(Number(formData.servings)) || Number(formData.servings) < 1) {
      newErrors.servings = 'Please enter a valid number of servings';
    }

    // Ingredients validation
    const validIngredients = formData.ingredients.filter(ing => ing.trim() !== '');
    if (validIngredients.length < 2) {
      newErrors.ingredients = 'Please add at least 2 ingredients';
    }

    // Instructions validation
    const validInstructions = formData.instructions.filter(inst => inst.trim() !== '');
    if (validInstructions.length < 2) {
      newErrors.instructions = 'Please add at least 2 cooking steps';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleArrayChange = (field: 'ingredients' | 'instructions', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const addArrayItem = (field: 'ingredients' | 'instructions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'ingredients' | 'instructions', index: number) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the data to your backend
      console.log('Recipe submitted:', {
        ...formData,
        ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
        instructions: formData.instructions.filter(inst => inst.trim() !== ''),
        id: Date.now() // Generate a temporary ID
      });

      // Show success message and redirect
      alert('Recipe added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting recipe:', error);
      alert('Error adding recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
          <div className="flex items-center space-x-3">
            <ChefHat className="w-8 h-8 text-orange-500" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Recipe</h1>
              <p className="text-gray-600 mt-1">Share your culinary creation with the world</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 font-bold">📝</span>
              </div>
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recipe Title */}
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 ${
                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter recipe title..."
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Recipe Summary */}
              <div className="md:col-span-2">
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Summary *
                </label>
                <textarea
                  id="summary"
                  rows={3}
                  value={formData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 resize-none ${
                    errors.summary ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Brief description of your recipe..."
                />
                {errors.summary && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.summary}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 ${
                    errors.image ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="https://example.com/recipe-image.jpg"
                />
                {errors.image && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.image}
                  </p>
                )}
              </div>

              {/* Cook Time */}
              <div>
                <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Cook Time *
                </label>
                <input
                  type="text"
                  id="cookTime"
                  value={formData.cookTime}
                  onChange={(e) => handleInputChange('cookTime', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 ${
                    errors.cookTime ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 30 minutes"
                />
                {errors.cookTime && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.cookTime}
                  </p>
                )}
              </div>

              {/* Servings */}
              <div>
                <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-2">
                  Servings *
                </label>
                <input
                  type="number"
                  id="servings"
                  min="1"
                  value={formData.servings}
                  onChange={(e) => handleInputChange('servings', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 ${
                    errors.servings ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="4"
                />
                {errors.servings && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.servings}
                  </p>
                )}
              </div>

              {/* Difficulty */}
              <div className="md:col-span-2">
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level *
                </label>
                <div className="flex space-x-4">
                  {['Easy', 'Medium', 'Hard'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleInputChange('difficulty', level)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                        formData.difficulty === level
                          ? getDifficultyColor(level)
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 font-bold">🥕</span>
              </div>
              Ingredients
            </h2>
            
            <div className="space-y-4">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                      placeholder={`Ingredient ${index + 1}...`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('ingredients', index)}
                    disabled={formData.ingredients.length === 1}
                    className="p-2 text-red-500 hover:text-red-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('ingredients')}
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Add Ingredient</span>
              </button>
              
              {errors.ingredients && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.ingredients}
                </p>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 font-bold">👨‍🍳</span>
              </div>
              Cooking Instructions
            </h2>
            
            <div className="space-y-4">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-2">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <textarea
                      rows={3}
                      value={instruction}
                      onChange={(e) => handleArrayChange('instructions', index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 resize-none"
                      placeholder={`Step ${index + 1} instructions...`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('instructions', index)}
                    disabled={formData.instructions.length === 1}
                    className="p-2 text-red-500 hover:text-red-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors duration-200 mt-2"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('instructions')}
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Add Step</span>
              </button>
              
              {errors.instructions && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.instructions}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 disabled:transform-none disabled:shadow-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding Recipe...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Add Recipe</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddRecipeForm;