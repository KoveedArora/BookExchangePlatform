import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/books', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data); // Update the state with fetched books
    } catch (err) {
      console.error('Error fetching books:', err);
      alert('Failed to fetch books.');
    }
  };

  const deleteBook = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Book deleted successfully.');
      fetchBooks(); // Refresh the book list after deletion
    } catch (err) {
      console.error('Error deleting book:', err);
      alert('Failed to delete book.');
    }
  };

  useEffect(() => {
    fetchBooks(); // Fetch books when the component mounts
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>My Books</h1>
      <table border="1" style={{ margin: '0 auto', width: '80%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Condition</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.condition}</td>
              <td>
                <button
                  onClick={() => navigate(`/edit-book/${book._id}`)}
                  style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBook(book._id)}
                  style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksPage;