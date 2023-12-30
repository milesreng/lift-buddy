const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  primary_category: {
    type: String,
    required: true
  },
  secondary_category: {
    type: String
  },
  machine: {
    type: String
  },
  link: {
    type: String
  }
}, { timestamps: true })

const Exercise = mongoose.model('exercise', ExerciseSchema)

module.exports = Exercise