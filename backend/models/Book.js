const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  library: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  borrowed: { 
    type: Boolean,
    required: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema)