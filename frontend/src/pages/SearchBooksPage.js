import React, { useState } from 'react';
import axios from 'axios';

const SearchBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/books/search', {
        params: { term: searchTerm },
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(res.data);
    } catch (err) {
      console.error('Error searching books:', err);
      alert('Failed to search books.' + err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Search Books</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title, author, or genre"
        style={{ marginBottom: '20px', padding: '10px', width: '50%' }}
      />
      <button
        onClick={fetchBooks}
        style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none' }}
      >
        Search
      </button>
      {loading && <p>Loading...</p>}
      <table border="1" style={{ margin: '20px auto', width: '80%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchBooksPage;