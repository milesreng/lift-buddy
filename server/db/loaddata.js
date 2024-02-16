const mongoose = require('mongoose')
const fs = require('fs')

const data = JSON.parse(fs.readFileSync('./exercises.json', 'utf-8'))

const Exercise = require('../models/exercise.model')


// read from csv
const importData = async () => {
  try {
    await Exercise.create(data)
    console.log('successfully imported data')
    process.exit()
  } catch (e) {
    console.error('could not import data', e)
  }
}

importData()