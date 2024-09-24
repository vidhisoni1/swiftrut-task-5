import React, { useEffect, useState } from 'react';
import { getRecipes } from '../services/recipeService';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]); // All recipes
    const [filteredRecipes, setFilteredRecipes] = useState([]); // Filtered recipes for display
    const [searchQuery, setSearchQuery] = useState(''); // Search query input
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getRecipes();
                setRecipes(data.recipes || []);
                setFilteredRecipes(data.recipes || []); // Initially, display all recipes
            } catch (err) {
                setError('Failed to fetch recipes. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    // Filter recipes based on search query
    useEffect(() => {
        if (!searchQuery) {
            setFilteredRecipes(recipes); // Reset to all recipes when there's no search query
        } else {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = recipes.filter(recipe => 
                recipe.cuisineType.toLowerCase().includes(lowercasedQuery) ||
                recipe.ingredients.some(ingredient => 
                    ingredient.toLowerCase().includes(lowercasedQuery)
                )
            );
            setFilteredRecipes(filtered);
        }
    }, [searchQuery, recipes]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Display loading or error messages if necessary
    if (loading) {
        return <div className="container p-5 text-secondary">Loading...</div>;
    }

    if (error) {
        return <div className="container p-5 text-danger">{error}</div>;
    }

    return (
        <div className="container p-5">
            <h1 className="text-center display-4 mb-5 text-secondary">Our Delicious Recipes</h1>
            
            {/* Search bar */}
            <div className="mb-5 ">
                <input
                    type="text"
                    placeholder="Search by ingredients or cuisine type..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control form-control-lg text-secondary"
                />
            </div>

            <div className="row">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                        <div key={recipe._id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                {recipe.image && (
                                    <img
                                        src={`http://localhost:5000/${recipe.image}`}
                                        alt={recipe.title}
                                        className="card-img-top"
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.title}</h5>
                                    <p className="card-text">
                                        {recipe.ingredients ? recipe.ingredients.join(', ') : 'No ingredients available'}
                                    </p>
                                    <p className="text-muted">Cuisine: {recipe.cuisineType}</p>
                                    <Link to={`/recipes/${recipe._id}`} className="btn btn-primary">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center text-muted text-secondary">No recipes match your search.</div>
                )}
            </div>
        </div>
    );
};

export default RecipeList;
