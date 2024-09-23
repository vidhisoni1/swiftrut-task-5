import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);
      console.log('Token stored:', localStorage.getItem('token'));

      // Redirect to Create Recipe page
      navigate('/create-recipe');
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='container'>
    <div className='row '>
        
    <div className="card p-4 col-4 shadow border-0 ">
      <h2 className='text-secondary'>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label  text-secondary">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-secondary">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-info text-secondary">Login</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Login;
