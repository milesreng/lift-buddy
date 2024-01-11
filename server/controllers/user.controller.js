const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

const User = require('../models/user.model')

const userController = {
  register: async (req, res) => {
    const user = req.body

    // ensure correct email format
    if (!validator.isEmail(user.email)) {
      return res.status(400).json({error: 'incorrect email format'})
    }

    // confirm password strength
    // 8+ char, at least one lower/uppercase, number and symbol
    if (!validator.isStrongPassword(user.password)) {
      return res.status(400).json({error: 'password is too weak'})
    }

    // confirm username format
    if (!validator.matches(user.username, '^[a-zA-Z0-9_.-]*$')) {
      return res.status(400).json({error: 'username not valid'})
    }

    const takenUsername = await User.findOne({username: user.username})
    const takenEmail = await User.findOne({email: user.email})

    if (takenUsername) {
      return res.status(400).json({error: 'username has been taken'})
    } else if (takenEmail) {
      return res.status(400).json({error: 'there is already an account connected to this email'})
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)
    const lowerUsername = user.username.toLowerCase()

    const newUser = new User({ 
      username: lowerUsername, 
      firstname: user.firstname,
      email: user.email,
      password: hashedPassword})
      
      await newUser.save()

    return res.status(201).json({ message: 'user successfully registered' })
  },
  login: async (req, res) => {
    const user = req.body
    const dbUser = await User.findOne({ email: user.email })

    // Match password with database password
    if (!dbUser || !bcrypt.compare(user.password, dbUser.password)) {
      return res.status(401).json({ error:'invalid username or password' })
    }

    // Create a JSON web token
    const token = jwt.sign({ userId: dbUser._id, email: dbUser.email }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    })

    res.status(200).json({ message: 'user successfully authenticated', token, userInfo: dbUser })
  },
  get_profile: async (req, res) => {
    console.log(req)
    const uid = req.userData.userId
    const user = await User.findById(uid)

    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }

    return res.status(200).json(user)
  },
  update_email: async (req, res) => {
    const user = req.body

    if (!validator.isEmail(user.email)) {
      return res.json({message: 'incorrect email format'})
    }

    const existEmail = await User.findOne({email: user.email})

    if (existEmail) {
      res.json({message: 'email has already been taken'})
    }

    const updateUser = await User.findByIdAndUpdate(user._id, { email: user.email })
    
    if (!updateUser) {
      return res.status(404).json({message: 'could not update email'})
    }
    
    return res.status(201).json({message: 'email successfully updated'})
  },
  update_password: async (req, res) => {
    const user = req.body
  
    if (!validator.isStrongPassword(user.password)) {
      return res.json({message: 'password too weak'})
    }
  
    const hashedPassword = await bcrypt.hash(user.password, 10)
  
    const updateUser = await User.findByIdAndUpdate(user._id, { password: hashedPassword })
  
    if (!updateUser) {
      return res.status(404).json({message: 'could not update password'})
    }
    
    return res.status(201).json({message: 'password successfully updated'})
  },
  update_profile_details: async (req, res) => {
    const user = req.body
  
    const dbUser = User.findById(user._id)
  
    if (!dbUser) {
      return res.status(404).json({message: 'could not find user'})
    }
  
    if (user.firstname) {
      dbUser.firstname = user.firstname
    }
  
    if (user.lastname) {
      dbUser.lastname = user.lastname
    }
  
    const updateUser = await dbUser.save()
  
    if (!updateUser) {
      return res.status(404).json({message: 'could not update user'})
    }
  
    return res.status(201).json({message: 'user profile successfully updated'})
  },
  delete_user: async (req, res) => {
    try {
      const user = req.body
      await User.findByIdAndDelete(user._id)
  
      return res.status(201).json({message: 'user account successfully deleted'})
    } catch (e) {
      return res.status(400).json({ message: 'could not delete user account'})
    }
  }
}

module.exports = userController