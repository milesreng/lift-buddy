const express = require('express')

const router = express.Router()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const User = require('../../models/user.model')

// @route   POST api/users
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const user = req.body
    const dbUser = await User.findOne({ email: user.email })

    if (!dbUser) {
      return res.status(401).json({ error:'invalid username or password' })
    }

    // Match password with database password
    const pwMatch = await bcrypt.compare(user.password, dbUser.password)

    if (!pwMatch) {
      return res.status(401).json({ error:'invalid username or password' })
    }

    // Create a JSON web token
    const token = jwt.sign({ userId: dbUser._id, email: dbUser.email }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    })

    console.log(dbUser)
    res.status(200).json({ message: 'user successfully authenticated', token, userId: dbUser._id })

  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'user authentication failed'})
  }
})

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const user = req.body

    // ensure correct email format
    if (!validator.isEmail(user.email)) {
      res.json({message: 'incorrect email format'})
      return
    }

    // confirm password strength
    // 8+ char, at least one lower/uppercase, number and symbol
    if (!validator.isStrongPassword(user.password)) {
      res.json({message: 'password too weak'})
      return
    }

    // Ensure username and password are not taken
    const takenUsername = await User.findOne({username: user.username})
    const takenEmail = await User.findOne({email: user.email})

    if (takenUsername) {
      res.json({message: 'Username has already been taken'})
      return
    } else if (takenEmail) {
      res.json({message: 'Email has already been taken'})
      return
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)
    const lowerUsername = user.username.toLowerCase()
    console.log('hashed password')
    const newUser = new User({ 
      username: lowerUsername, 
      firstname: user.firstname,
      email: user.email,
      password: hashedPassword})
      
      await newUser.save()

    res.status(201).json({ message: 'user successfully registered' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'registration failed' })
  }
})

module.exports = router