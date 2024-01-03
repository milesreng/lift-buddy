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
    .on('end', async () => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        const newExercise = new Exercise({
          name: String(data[i].name),
          description: data[i].description,
          primary_category: data[i].primary_category,
          secondary_category: data[i].secondary_category,
          machine: data[i].machine
        })

        await newExercise.save()
      }
  })