
const Book = require('../models/Book');

// Add a book
exports.addBook = async (req, res) => {
  try {
    // Fetch the logged-in user's email from the request
    const { email } = req.user;

    // Create a new book with the owner's email
    const book = await Book.create({
      ...req.body,
      ownerId: req.user.id,
      owner: email, // Set owner email
    });

    res.status(201).json(book);
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ error: 'Failed to add book.' });
  }
};


// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ownerId: req.user.id}).populate('title author genre condition');
    res.status(200).json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books.' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    if (book.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Unauthorized action.' });
    }

    // Update the book details with the provided data
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedBook);
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ error: 'Failed to update book.' });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    if (book.ownerId.toString() !== req.user.id.toString()) {
      console.log("Book is owned by: " + book.ownerId.toString());
      console.log("Request is made by: " + req.user.id);
      return res.status(403).json({ error: 'Unauthorized action.' });
    }
    await Book.findByIdAndDelete(req.params.id); // Correct delete method
    res.status(200).json({ message: 'Book deleted successfully.' });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ error: 'Failed to delete book.' });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    if (book.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Unauthorized access to book.' });
    }
    res.status(200).json(book);
  } catch (err) {
    console.error('Error fetching book by ID:', err);
    res.status(500).json({ error: 'Failed to fetch book.' });
  }
};

// Search books by author, title, or genre
exports.searchBooks = async (req, res) => {
  try {
    const { term } = req.query; // Extract the search term from query parameters

    if (!term) {
      return res.status(400).json({error: 'Search Term is Required.'});
    }
    const searchQuery = {
      $or: [
        { title: { $regex: term, $options: 'i' } },  // Case-insensitive match for title
        { author: { $regex: term, $options: 'i' } }, // Case-insensitive match for author
        { genre: { $regex: term, $options: 'i' } },  // Case-insensitive match for genre
      ],
    };

    const books = await Book.find(searchQuery);
    res.status(200).json(books);
  } catch (err) {
    console.error('Error searching books:', err);
    res.status(500).json({ error: 'Failed to search books.' });
  }
};