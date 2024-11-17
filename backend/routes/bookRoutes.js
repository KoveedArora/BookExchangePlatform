
const express = require('express');
const { addBook, getBooks, deleteBook, updateBook, getBookById, searchBooks } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.post('/', addBook);
router.get('/', getBooks);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);
router.get('/search', searchBooks);
router.get('/:id', getBookById);

module.exports = router;
