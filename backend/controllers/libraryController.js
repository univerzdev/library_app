const Library = require('../models/Library');
const Book = require('../models/Book');
const Student = require('../models/Student');
const ObjectId = require('mongoose').Types.ObjectId;

const getLibraries = async (req, res) => {

  const libraries = await Library.find({}).sort({ createdAt: -1 })
  if (!libraries) {
    return res.status(404).json({ error: 'Libraries dont exist..' })
  }
  
  res.status(200).json(libraries)
}

const getLibrary = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json("Invalid id provided.")
  }
  const library = await Library.findById(id);

  if (!library) {
    return res.status(404).json({ error: 'Library with provided id doesnt exists.' })
  }

  res.status(200).json(library)
}

const createLibrary = async (req, res) => {
  const { title } = req.body

  if (!title) {
    return res.status(400).json({ error: 'Not all data provided.' })
  }

  try {
    const library = await Library.create({ title })
    res.status(200).json(library)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteLibrary = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }

  const library = await Library.findOneAndDelete({ _id: id });

  if (!library) {
    return res.status(400).json({ error: 'Library with this id doesnt exists.' })
  }

  await Book.deleteMany({ library: id });
  await Student.deleteMany({ library: id });
  res.status(200).json(library);
}

const updateLibrary = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id provided." })
  }

  try {
    const library = await Library.findOneAndUpdate({ _id: id }, {
      ...req.body
    }, { new: true })
    res.status(200).json(library)

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getLibraries,
  getLibrary,
  createLibrary,
  deleteLibrary,
  updateLibrary
}