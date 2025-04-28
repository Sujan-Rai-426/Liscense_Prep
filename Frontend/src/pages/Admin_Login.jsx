import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function AdminLogin() {
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when login starts

    try {
      const response = await api.post('/api/v1/admin-login/', {
        username,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('loggedIn', 'true');

        console.log('Login successful!');
        navigate('/admin');
      }
    } catch (err) {
      setError('Invalid credentials or user is not admin.');
    } finally {
      setLoading(false); // Always stop loading
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
              required
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
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

               {/* Button part to show indicator when login */}
            <div className="d-grid gap-2">
              <button 
                type="submit" 
                className="btn btn-primary d-flex justify-content-center align-items-center" 
                disabled={loading}
                style={{ height: "45px" }} // You can fix the height if you want smoother button during spinner
              >
                {loading ? (
                  <div className="spinner-border spinner-border-sm text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>

        </form>

        <div className="text-center mt-3">
          <p className="text-muted">
            Don't have an account? <Link to="/admin_signup" className="text-primary">Join Team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
