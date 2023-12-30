const mongoose = require('mongoose')

const { workoutDetailSchema } = require('./detail.model')

const workoutSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  template_id: {
    type: Schema.Types.ObjectId,
    ref: 'Template'
  },
  name: {
    type: String, 
    required: true
  },
  exercises: {
    type: [ workoutDetailSchema ]
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  }
}, { timestamps: true })

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout