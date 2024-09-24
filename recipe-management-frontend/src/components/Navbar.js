import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning shadow-sm">
      <div className="container">
        {/* Brand Name */}
        <Link className="navbar-brand text-secondary fw-bold" to="/">
          RECIPES
        </Link>
        



        {/* Navbar Links */}
        <div className="" id="">
          <ul className="navbar-nav ms-auto">
            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" to="/create">
                    Create Recipe
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" to="/my-recipes">
                    Show My Recipes
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger ms-3"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!token && (
              <>
               
                  <Link
                    to="/login"
                    className="nav-link text-secondary text-decoration-none"
                  >
                    Login
                  </Link>
                
                
                  <Link
                    to="/register"
                    className="btn   ms-3 btn-secondary text-warning" 
                  >
                    Register
                  </Link>
                
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
