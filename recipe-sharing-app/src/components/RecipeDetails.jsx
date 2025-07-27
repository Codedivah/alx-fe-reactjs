// src/components/RecipeDetails.jsx
import { useParams } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'

function RecipeDetails() {
  const { id } = useParams()
  const recipe = useRecipeStore((state) => state.recipes[parseInt(id)])

  if (!recipe) {
    return <div>Recipe not found</div>
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
    </div>
  )
}

export default RecipeDetails
