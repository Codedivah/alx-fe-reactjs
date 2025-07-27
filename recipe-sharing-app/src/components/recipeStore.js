import { create } from 'zustand';

interface Recipe {
  id: number;
  title: string;
  description: string;
}

interface RecipeStore {
  recipes: Recipe[];
  searchTerm: string;
  filteredRecipes: Recipe[];
  addRecipe: (newRecipe: Recipe) => void;
  updateRecipe: (id: number, updatedRecipe: Partial<Recipe>) => void;
  deleteRecipe: (id: number) => void;
  setRecipes: (recipes: Recipe[]) => void;
  setSearchTerm: (term: string) => void;
}

const filterRecipesByTerm = (recipes: Recipe[], searchTerm: string): Recipe[] => {
  return searchTerm.trim() === '' 
    ? recipes
    : recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
};

export const useRecipeStore = create<RecipeStore>((set) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
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
      return {
        recipes: newRecipes,
        filteredRecipes: filterRecipesByTerm(newRecipes, state.searchTerm)
      };
    }),
  setRecipes: (recipes) => set((state) => ({
    recipes,
    filteredRecipes: filterRecipesByTerm(recipes, state.searchTerm)
  })),
  setSearchTerm: (term) => set((state) => ({
    searchTerm: term,
    filteredRecipes: filterRecipesByTerm(state.recipes, term)
  }))
}));

export type { Recipe };