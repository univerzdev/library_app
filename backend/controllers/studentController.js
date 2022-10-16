const Student = require('../models/Student');
const Book = require('../models/Book');
const ObjectId = require('mongoose').Types.ObjectId;

const getStudents = async (req, res) => {
  const students = await Student.find({}).sort({ createdAt: -1 }).populate("library").populate("borrowedBook");
  res.status(200).json(students)
}

const getStudent = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }

  const student = await Student.findById(id).populate("borrowedBooks.book");

  if (!student) {
    return res.status(404).json({ error: 'Student with provided id doesnt exists.' })
  }

  res.status(200).json(student)
}

const createStudent = async (req, res) => {
  const { name, library } = req.body

  if (!name || !library) {
    return res.status(400).json({ error: 'Not all data provided.' })
  }

  try {
    const student = await Student.create({ name, library })
    res.status(200).json(student)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const removeStudentFromLibrary = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }
  const student = await Student.findById(id)

  if (!student) {
    return res.status(400).json({ error: 'Student with this id doesnt exists.' })
  }

  const book = await Book.findOneAndUpdate({ _id: student.borrowedBook }, {
    borrowed: false
  }, { new: true })

  await student.updateOne({
    $unset: { library: 1, borrowedBook: 1 }
  })
  res.status(200).json({ student, book });

}

const updateStudent = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }
  const student = await Student.findOneAndUpdate({ _id: id }, {
    ...req.body
  }, { new: true }).populate("borrowedBook");

  if (!student) {
    return res.status(400).json({ error: 'Student with this id doesnt exists.' })
  }
  res.status(200).json(student)

}
const getStudentsForLibrary = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }

  const students = await Student.find({ library: id }).populate("borrowedBook").sort({ createdAt: -1 })
  res.status(200).json(students)
}
const getAvailableStudentsForLibrary = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }
  const students = await Student.find({ library: id, borrowedBook: null }).sort({ createdAt: -1 });
  res.status(200).json(students)

}

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  removeStudentFromLibrary,
  updateStudent,
  getStudentsForLibrary,
  getAvailableStudentsForLibrary
}