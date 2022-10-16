const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  library: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Library'
  },
  borrowedBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  borrowedBooks: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    time: {
      type: Date
    }
  }]

}, { timestamps: true })

module.exports = mongoose.model('Student', studentSchema)