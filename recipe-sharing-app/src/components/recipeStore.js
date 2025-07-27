// store/recipeStore.js
import { create } from 'zustand'

const useRecipeStore = create((set) => ({
  recipes: [
    { title: 'Rice and Beans', description: 'Tasty and filling' },
    { title: 'Pasta', description: 'Quick and easy' },
  ],
  addRecipe: (recipe) => set((state) => ({
    recipes: [...state.recipes, recipe],
  })),
}))

export default useRecipeStore
