const mongoose = require('mongoose')

const { workoutDetailSchema } = require('./detail.model')

const templateSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  exercises: {
    type: [ workoutDetailSchema ],
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true })

const Template = mongoose.model('Template', templateSchema)

module.exports = Template