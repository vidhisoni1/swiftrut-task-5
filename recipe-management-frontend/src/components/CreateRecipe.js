import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cuisine: '',
    cookingTime: ''
  });
  const navigate = useNavigate();

  const createRecipe = async (recipeData) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/recipes', recipeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createRecipe({
      title: recipe.title,
      ingredients: recipe.ingredients.split(','),
      instructions: recipe.instructions,
      cuisine: recipe.cuisine,
      cookingTime: recipe.cookingTime,
    });
  };

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card p-4">
      <h2>Create a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ingredients (comma separated)</label>
          <input
            type="text"
            className="form-control"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea
            className="form-control"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Cuisine</label>
          <input
            type="text"
            className="form-control"
            name="cuisine"
            value={recipe.cuisine}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cooking Time (minutes)</label>
          <input
            type="number"
            className="form-control"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
