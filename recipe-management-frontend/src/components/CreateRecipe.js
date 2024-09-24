import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../services/recipeService';

const CreateRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate to redirect after creation

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients.split(','));
    formData.append('instructions', instructions);
    formData.append('cuisineType', cuisineType);
    formData.append('cookingTime', cookingTime);
    formData.append('image', image);

    try {
      await createRecipe(formData);
      navigate('/my-recipes'); // Redirect to MyRecipes after successful creation
    } catch (err) {
      setError('Error creating recipe');
      console.error(err);
    }
  };

  return (
    <div className="container my-5 ">
      <div className='col-6 mx-auto'>
      <h1 className="mb-4 text-center text-secondary">Create Recipe</h1>
      {error && <p className="text-danger text-center text-secondary">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label text-secondary">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control text-secondary"
            placeholder="Recipe Title"
            required
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label text-secondary">Ingredients</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="form-control text-secondary"
            placeholder="types of ingrediants"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-secondary">Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="form-control text-secondary"
            placeholder="instructions"
            rows="4"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-secondary">Cuisine Type</label>
          <input
            type="text"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
            className="form-control text-secondary"
            placeholder="Cuisine Type"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-secondary">Cooking Time (in minutes)</label>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="form-control text-secondary " 
            placeholder="Cooking Time"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-secondary">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          className="btn btn-warning text-secondary w-100"
        >
          Create Recipe
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateRecipe;
