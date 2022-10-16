const express = require('express')
const {
  getLibraries, 
  getLibrary, 
  createLibrary, 
  deleteLibrary, 
  updateLibrary,
} = require('../controllers/libraryController')

const router = express.Router()

router.get('/', getLibraries)
router.get('/:id', getLibrary)

router.post('/', createLibrary)

router.patch('/:id', updateLibrary)

router.delete('/:id', deleteLibrary)



module.exports = router