import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBookPage = () => {
  const { id } = useParams(); // Get the book ID from the route
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [condition, setCondition] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const fetchBookDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const book = res.data;
      setTitle(book.title);
      setAuthor(book.author);
      setGenre(book.genre);
      setCondition(book.condition);
      setAddress(book.address);
    } catch (err) {
      console.error('Error fetching book details:', err);
      alert('Failed to fetch book details.');
    }
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/books/${id}`,
        { title, author, genre, condition, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Book updated successfully!');
      navigate('/view-books');
    } catch (err) {
      console.error('Error updating book:', err);
      alert('Failed to update book. Please try again.');
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Edit Book</h1>
      <form onSubmit={handleUpdateBook}>
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
        <button type="submit" style={{ marginTop: '10px' }}>Update Book</button>
      </form>
    </div>
  );
};

export default EditBookPage;
