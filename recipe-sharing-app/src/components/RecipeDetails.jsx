import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import { useState } from 'react';

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(id || '0'))
  );

  if (!recipe) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Recipe not found</h2>
        <Link 
          to="/"
          style={{ 
            color: '#007bff', 
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          ← Back to Recipe List
        </Link>
      </div>
    );
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteSuccess = () => {
    navigate('/');
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Link 
        to="/"
        style={{ 
          color: '#007bff', 
          textDecoration: 'none',
          fontWeight: 'bold',
          marginBottom: '20px',
          display: 'inline-block'
        }}
      >
        ← Back to Recipe List
      </Link>

      {isEditing ? (
        <EditRecipeForm 
          recipe={recipe} 
          onCancel={handleEditToggle}
          onSave={handleEditToggle}
        />
      ) : (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h1 style={{ marginBottom: '10px' }}>{recipe.title}</h1>
            <p style={{ 
              fontSize: '16px', 
              lineHeight: '1.6',
              color: '#333'
            }}>
              {recipe.description}
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '10px',
            marginTop: '30px'
          }}>
            <button
              onClick={handleEditToggle}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Edit Recipe
            </button>
            
            <DeleteRecipeButton 
              recipeId={recipe.id} 
              onDeleteSuccess={handleDeleteSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
