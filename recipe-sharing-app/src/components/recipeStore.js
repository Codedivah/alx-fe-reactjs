import { create } from 'zustand';

interface Recipe {
  id: number;
  title: string;
  description: string;
}

interface RecipeStore {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  searchTerm: string;
  favorites: number[]; // NEW
  recommendations: Recipe[]; // NEW

  addRecipe: (newRecipe: Recipe) => void;
  updateRecipe: (id: number, updatedRecipe: Partial<Recipe>) => void;
  deleteRecipe: (id: number) => void;

  setRecipes: (recipes: Recipe[]) => void;
  setSearchTerm: (term: string) => void;

  // Favorites
  addFavorite: (recipeId: number) => void;
  removeFavorite: (recipeId: number) => void;

  // Recommendations
  generateRecommendations: () => void;
}

const filterRecipesByTerm = (recipes: Recipe[], searchTerm: string): Recipe[] => {
  return searchTerm.trim() === ''
    ? recipes
    : recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
};

export const useRecipeStore = create<RecipeStore>((set) => ({
  recipes: [],
  filteredRecipes: [],
  searchTerm: '',

  favorites: [], // NEW
  recommendations: [], // NEW

  addRecipe: (newRecipe) =>
    set((state) => {
      const newRecipes = [...state.recipes, newRecipe];
      return {
        recipes: newRecipes,
        filteredRecipes: filterRecipesByTerm(newRecipes, state.searchTerm)
      };
    }),

  updateRecipe: (id, updatedRecipe) =>
    set((state) => {
      const newRecipes = state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      );
      return {
        recipes: newRecipes,
        filteredRecipes: filterRecipesByTerm(newRecipes, state.searchTerm)
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const newRecipes = state.recipes.filter((recipe) => recipe.id !== id);
      const newFavorites = state.favorites.filter(favId => favId !== id);
      return {
        recipes: newRecipes,
        favorites: newFavorites,
        filteredRecipes: filterRecipesByTerm(newRecipes, state.searchTerm)
      };
    }),

  setRecipes: (recipes) =>
    set((state) => ({
      recipes,
      filteredRecipes: filterRecipesByTerm(recipes, state.searchTerm)
    })),

  setSearchTerm: (term) =>
    set((state) => ({
      searchTerm: term,
      filteredRecipes: filterRecipesByTerm(state.recipes, term)
    })),

  // FAVORITES
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...new Set([...state.favorites, recipeId])]
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId)
    })),

  // RECOMMENDATIONS (mock logic: randomly recommend non-favorites)
  generateRecommendations: () =>
    set((state) => {
      const nonFavorites = state.recipes.filter(
        (r) => !state.favorites.includes(r.id)
      );
      const recommended = nonFavorites.filter(() => Math.random() > 0.5);
      return { recommendations: recommended };
    })
}));

export type { Recipe };
