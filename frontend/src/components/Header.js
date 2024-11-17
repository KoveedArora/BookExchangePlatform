import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if the user is logged in

  const handleLogout = async () => {
    try {
      // Send logout request to backend
      await axios.post('/api/auth/logout');
      // Clear token from local storage
      localStorage.removeItem('token');
      alert('Logged out successfully.');
      // Navigate to login page
      navigate('/login');
    } catch (err) {
      console.error('Error during logout:', err);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <header style={{ padding: '10px', backgroundColor: '#282c34', color: 'white' }}>
      <nav>
        <Link to="/" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Home</Link>
        {!token ? (
          <>
            <Link to="/login" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/add-book" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Add Book</Link>
            <Link to="/view-books" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>My Books</Link>
            <Link to="/search-books" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Search Books</Link>
            <Link to="/reset-password" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Reset Password</Link>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: '20px',
                padding: '5px 10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
