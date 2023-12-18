const express = require('express')
const connectDB = require('./config/db.config')
const cors = require('cors')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/api/auth.routes')
const userRoutes = require('./routes/api/user.routes')
const exerciseRoutes = require('./routes/api/exercise.routes')

const app = express()

app.use(express.json())
app.use(cors({ origin: true, credentials: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/exercises', exerciseRoutes)

connectDB()

app.get('/', (req, res) => res.json({ message: 'test main route' }))

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})