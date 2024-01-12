const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user_id: String,
  description: String,
  primary_category: {
    type: String,
    required: true
  },
  secondary_category: String,
  machine: String
}, { timestamps: true })

const Exercise = mongoose.model('exercise', ExerciseSchema)

module.exports = Exercise