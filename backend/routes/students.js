const express = require('express')
const {
  getStudents,
  getStudent,
  createStudent, 
  removeStudentFromLibrary, 
  updateStudent,
  getStudentsForLibrary,
  getAvailableStudentsForLibrary
} = require('../controllers/studentController')

const router = express.Router()

router.get('/', getStudents)
router.get('/:id', getStudent)
router.get('/library/:id', getStudentsForLibrary)
router.get('/library/:id/available', getAvailableStudentsForLibrary)

router.post('/', createStudent)

router.patch('/:id', updateStudent)

router.delete('/:id', removeStudentFromLibrary)


module.exports = router