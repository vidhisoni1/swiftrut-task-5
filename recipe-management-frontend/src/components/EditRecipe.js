import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../services/recipeService';

const EditRecipe = ({ token }) => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cuisineType: '',
    cookingTime: '',
  });
  const navigate = useNavigate(); // Use navigate to redirect after updating

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await getRecipeById(id);
      setRecipeData({
        title: recipe.title,
        ingredients: recipe.ingredients.join(', '),
        instructions: recipe.instructions,
        cuisineType: recipe.cuisineType,
        cookingTime: recipe.cookingTime,
      });
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecipe = {
        ...recipeData,
        ingredients: recipeData.ingredients.split(','),
      };
      await updateRecipe(id, updatedRecipe, token);
      navigate('/my-recipes'); // Redirect to MyRecipes after successful update
    } catch (error) {
      console.error(error);
      alert('Error updating recipe');
    }
  };

  return (
    <div className="container my-5">
      <div className='col-6 mx-auto'>
      <h1 className="mb-4 text-center text-secondary">Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-secondary">Title</label>
          <input
            type="text"
            name="title"
            value={recipeData.title}
            onChange={handleChange}
            className="form-control text-secondary"
            placeholder="Recipe Title"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-secondary">Ingredients</label>
          <input
            type="text"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
            className="form-control text-secondary"
            placeholder="Comma separated ingredients"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-secondary">Instructions</label>
          <textarea
            name="instructions"
            value={recipeData.instructions}
            onChange={handleChange}
            className="form-control text-secondary"
            placeholder="Recipe Instructions"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-secondary">Cuisine Type</label>
          <input
            type="text"
            name="cuisineType"
            value={recipeData.cuisineType}
            onChange={handleChange}
            className="form-control text-secondary"
            placeholder="e.g., Italian, Chinese"
            required
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label text-secondary">Cooking Time (in minutes)</label>
          <input
            type="text"
            name="cookingTime"
            value={recipeData.cookingTime}
            onChange={handleChange}
            className="form-control text-secondary"
            placeholder="e.g., 30"
            required
          />
        </div>
        <button type="submit" className="btn btn-warning text-secondary w-100">
          Update Recipe
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditRecipe;
