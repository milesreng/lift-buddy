const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')

const exerciseRoutes = require('./routes/api/exercises')

const app = express()

app.use(express.json())
app.use(cors({ origin: true, credentials: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/exercises', exerciseRoutes)

connectDB()

app.get('/', (req, res) => res.send('hello'))

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})