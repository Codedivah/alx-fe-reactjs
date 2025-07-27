import { create } from 'zustand';

interface Recipe {
  id: number;
  title: string;
  description: string;
}

interface RecipeStore {
  recipes: Recipe[];
  addRecipe: (newRecipe: Recipe) => void;
  updateRecipe: (id: number, updatedRecipe: Partial<Recipe>) => void;
  deleteRecipe: (id: number) => void;
  setRecipes: (recipes: Recipe[]) => void;
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  recipes: [],
  addRecipe: (newRecipe) => 
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
  setRecipes: (recipes) => set({ recipes })
}));

export type { Recipe };