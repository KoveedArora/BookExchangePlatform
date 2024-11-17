import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Book Exchange Platform</h1>
      <p>Exchange books with fellow users and explore a wide variety of genres!</p>
      <button
        onClick={() => navigate('/login')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
    </div>
  );
};

export default HomePage;
