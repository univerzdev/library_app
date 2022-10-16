const Book = require('../models/Book');
const Student = require('../models/Student');
const ObjectId = require('mongoose').Types.ObjectId;

const getBooks = async (req, res) => {
  const books = await Book.find({}).sort({ createdAt: -1 });
  if (!books) {
    return res.status(404).json({ error: 'Book with provided id doesnt exists.' })
  }
  res.status(200).json(books)
}

const getBook = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }
  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({ error: 'Book with provided id doesnt exists.' })
  }
  res.status(200).json(book)
}

const createBook = async (req, res) => {
  const { title, year, isbn, library } = req.body

  if (!title || !year || !isbn || !library) {
    return res.status(400).json({ error: 'Not all data provided.' })
  }

  try {
    const book = await Book.create({ title, year, isbn, borrowed: false, library })
    res.status(200).json(book)

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/* Removing Book from Library - set new data for Book and Student */
const removeBookFromLibrary = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }
  const book = await Book.findOneAndUpdate({ _id: id }, { library: null, borrowed: false }, { new: true })
  if (!book) {
    return res.status(400).json({ error: 'Book with this id doesnt exists.' })
  }

  const student = await Student.findOneAndUpdate({ borrowedBook: id }, { $unset: { borrowedBook: 1 } }, { new: true })
  res.status(200).json({ book, student });
}

const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }

  const book = await Book.findOneAndUpdate({ _id: id }, {
    ...req.body
  }, { new: true })

  if (!book) {
    return res.status(400).json({ error: 'Book with this id doesnt exists.' })
  }

  const student = await Student.findOne({ borrowedBook: id }).populate("borrowedBook");
  if (student) {
    const bookWithData = { ...book._doc, timeFrom: student.borrowedBooks[student.borrowedBooks.length - 1].time }
    return res.status(200).json(bookWithData)
  }
  res.status(200).json(book)
}

/* Get Books for specific Library with the necessary data. */
const getBooksForLibrary = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }

  const books = await Book.find({ library: id }).sort({ createdAt: -1 });
  const students = await Student.find({ library: id, borrowedBook: { $ne: null } });
  const completedBooks = await addDataForBooks(books, students);

  res.status(200).json(completedBooks)
}

/* Get available Books in specific Library */
const getAvailableBooksForLibrary = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }
  const books = await Book.find({ library: id, borrowed: false }).sort({ createdAt: -1 });

  res.status(200).json(books)
}

/* Borrowing the Book - setting new data for the Book and the Student */
const borrowBook = async (req, res) => {
  const { id } = req.params;
  const { studentId } = req.body;

  if (!ObjectId.isValid(id) || !ObjectId.isValid(studentId)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }

  const student = await Student.findById(studentId);
  const book = await Book.findById(id);

  if (!student || !book) {
    return res.status(404).json({ error: "Not found student or book with provided IDs" })
  }

  const updatedStudent = await Student.findByIdAndUpdate(studentId, {
    borrowedBook: id, $push: {
      "borrowedBooks": {
        book: id,
        time: Date.now()
      }
    }
  }, { new: true }).populate("borrowedBook");

  const updatedBook = await Book.findByIdAndUpdate(id,{
    borrowed: true
  }, { new: true });

  const bookWithData = await { ...updatedBook._doc, timeFrom: updatedStudent.borrowedBooks[updatedStudent.borrowedBooks.length - 1].time }
  res.status(200).json({ book: bookWithData, student: updatedStudent })
}

/* Returning the book - setting new data for the Book and the Student */
const returnBook = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }

  const student = await Student.findOneAndUpdate({ borrowedBook: id }, {
    $unset: { borrowedBook: 1 }
  }, { new: true })

  if (!student) {
    return res.status(400).json({ error: 'Student with this id doesnt exists.' })
  }

  const book = await Book.findOneAndUpdate({ _id: id }, {
    borrowed: false
  }, { new: true })

  if (!book) {
    return res.status(400).json({ error: 'Book with this id doesnt exists.' })
  }

  res.status(200).json({ book, student })
}

/* A helper function that retrieves Students data for Books */
const addDataForBooks = async (books, students) => {
  let completedBooks = [];

  for (let i = 0; i < books.length; i++) {
    let isEqual = false;
    for (let j = 0; j < students.length; j++) {
      if (books[i]._id.equals(students[j].borrowedBook)) {
        isEqual = true;
        completedBooks.push({ ...books[i]._doc, timeFrom: students[j].borrowedBooks.length > 0 ? students[j].borrowedBooks[students[j].borrowedBooks.length - 1].time : '' });
      }
    }
    if (!isEqual) {
      completedBooks.push({ ...books[i]._doc });
    }
  }
  return completedBooks;
}

module.exports = {
  getBooks,
  getBook,
  getAvailableBooksForLibrary,
  getBooksForLibrary,
  createBook,
  removeBookFromLibrary,
  borrowBook,
  returnBook,
  updateBook
}