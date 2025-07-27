// components/EditRecipeForm.js
import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe(recipe.id, { title, description });
    alert('Recipe updated');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Recipe</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe description"
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;
