// store/recipeStore.js
import { create } from 'zustand';
import { nanoid } from 'nanoid';

const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: '1',
      title: 'Fried Rice',
      description: 'A delicious mix of rice, veggies, and spices.',
    },
  ],

  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, { ...recipe, id: nanoid() }],
    })),

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
}));

export default useRecipeStore;
