import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://library-management-system-3-ciao.onrender.com/api/auth/login', {
        email,
        password
      });
  
      console.log('Login successful:', response.data);
    // Save token to localStorage or sessionStorage
    localStorage.setItem('token', response.data.token);
    // Redirect to dashboard or other page
    navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error.response.data);
      alert('Login failed! Error: ' + error.response.data.error);
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
