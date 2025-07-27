import { useRecipeStore } from '../store/recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        recipes.map(recipe => (
          <div key={recipe.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <Link 
              to={`/recipe/${recipe.id}`}
              style={{ 
                color: '#007bff', 
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              View Details →
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;