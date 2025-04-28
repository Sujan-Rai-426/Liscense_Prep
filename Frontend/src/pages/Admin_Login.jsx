import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import api from '../api'; 

function AdminLogin() {
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Initialize the navigate function



  // For login successful
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post('/api/v1/admin-login/', {
        username,
        password
      });
  
      if (response.status === 200) {
        // Store token and logged-in status
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('loggedIn', 'true'); // Set loggedIn to true
        console.log('Login successful!');
  
        // Optionally log to check if loggedIn is correctly set
        const isLoggedIn = localStorage.getItem('loggedIn');
        console.log(isLoggedIn);  // Should log "true"
  
        navigate('/admin'); // Redirect to admin
      }
    } catch (err) {
      setError('Invalid credentials or user is not admin.');
    }
  };
  


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center text-primary mb-4">Admin Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        
        <div className="text-center mt-3">
          <p className="text-muted">
            Don't have an account? <a href="/admin_signup" className="text-primary">Join Team</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
