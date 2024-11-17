import React, { useState } from 'react';
import axios from 'axios';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [condition, setCondition] = useState('New');
  const [address, setAddress] = useState('');

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/books',
        { title, author, genre, condition, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Book added successfully!');
    } catch (err) {
      console.error('Error adding book:', err);
      alert('Failed to add book. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Add a New Book</h1>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <br />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <br />
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
          required
        />
        <br />
        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Used">Used</option>
        </select>
        <br />
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          rows="3"
          style={{ marginTop: '10px', width: '80%' }}
        />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;