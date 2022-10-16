require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const libraryRoutes = require('./routes/libraries')
const studentRoutes = require('./routes/students')
const bookRoutes = require('./routes/books');
const app = express()

app.use(express.json())

app.use('/api/libraries', libraryRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/books', bookRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  }) 