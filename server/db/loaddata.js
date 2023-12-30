const mongoose = require('mongoose')
const fs = require('fs')
const csv = require('fast-csv')

const Exercise = require('../models/exercise.model')

const data = []

// read from csv
fs.createReadStream('db/exercises.csv')
  .pipe(csv.parse({ headers: true }))
  .on('error', error => console.error(error))
  .on('data', row => data.push(row))

// load data

