const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  muscle_groups: {
    type: [String]
  },
  date_updated: {
    type: Date,
    default: Date.now
  }
})

module.exports = Exercise = mongoose.model('exercise', ExerciseSchema)