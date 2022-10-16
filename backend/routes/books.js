const express = require('express')
const {
  getBooks, 
  getBook, 
  createBook, 
  removeBookFromLibrary,
  updateBook,
  getBooksForLibrary,
  getAvailableBooksForLibrary,
  borrowBook,
  returnBook
} = require('../controllers/bookController')

const router = express.Router()

router.get('/', getBooks)
router.get('/:id', getBook)
router.get('/library/:id', getBooksForLibrary)
router.get('/library/:id/available', getAvailableBooksForLibrary)

router.post('/', createBook)

router.patch('/:id', updateBook)
router.patch('/:id/borrow-book', borrowBook)
router.patch('/:id/return-book', returnBook)

router.delete('/:id', removeBookFromLibrary)








module.exports = router