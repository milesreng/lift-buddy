const mongoose = require('mongoose')

const userMeasurementSchema = new mongoose.Schema({
  
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  birthDate: {
    type: Date
  }

}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User