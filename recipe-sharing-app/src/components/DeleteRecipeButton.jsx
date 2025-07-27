// components/DeleteRecipeButton.js
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(id);
    navigate('/'); // Go back to recipe list after deletion
  };

  return <button onClick={handleDelete}>Delete Recipe</button>;
};

export default DeleteRecipeButton;
