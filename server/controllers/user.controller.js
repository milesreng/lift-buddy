const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

const User = require('../models/user.model')

const userController = {
  register: async (req, res) => {
    try {
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
    } catch (e) {
      return res.status(402).json({ error: 'user could not be created' })
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const dbUser = await User.findOne({ email })

      if (dbUser) {
        var isMatch = await bcrypt.compare(password, dbUser.password)
      } else {
        return res.status(404).json({ error: 'user not found' })
      }
  
      // Match password with database password
      if (!isMatch) {
        return res.status(400).json({ error:'invalid username or password' })
      }
  
      // Create a JSON web token
      const token = jwt.sign({ userId: dbUser._id, email: dbUser.email }, process.env.SECRET_KEY, {
        expiresIn: '1h'
      })
  
      res.status(200).json({ message: 'user successfully authenticated', token, userInfo: dbUser })
    } catch (e) {
      console.log(e)
      return res.status(402).json({ error: 'user authentication failed' })
    }
  },
  get_profile: async (req, res) => {
    const uid = req.userData.userId
    const dbUser = await User.findById(uid)

    const user = { 
      username: dbUser.username, 
      firstname: dbUser.firstname,
      email: dbUser.email,
      createdAt: dbUser.createdAt
    }

    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }

    return res.status(200).json(user)
  },
  update_email: async (req, res) => {
    try {
      // implement email authentication prior to posting change
      const userId = userData.userId
      const email = req.body.email

      if (!validator.isEmail(email)) {
        return res.status(400).json({message: 'incorrect email format'})
      }

      const existEmail = await User.findOne({ email })

      if (existEmail) {
        res.json({message: 'email has already been taken'})
      }

      const updateUser = await User.findByIdAndUpdate(userId, { email })
      
      if (!updateUser) {
        return res.status(404).json({error: 'could not find user'})
      }
      
      return res.status(200).json({message: 'email successfully updated'})
    } catch (e) {
      console.log(e)
      return res.status(400).json({error: 'email could not be updated'})
    }
  },
  update_password: async (req, res) => {
    try {
      const userId = req.userData.userId
      const { old_password, new_password } = req.body
  
      const user = await User.findById(new ObjectId(userId))

      if (user) {
        var isMatch = await bcrypt.compare(old_password, user.password)
      }

      if (!isMatch) {
        return res.status(400).json({ error: 'incorrect password' })
      }

      if (!validator.isStrongPassword(user.new_password)) {
        return res.status(400).json({ error: 'password too weak' })
      }

      const hashedPassword = await bcrypt.hash(user.password, 10)
    
      await User.findByIdAndUpdate(user._id, { password: hashedPassword })

      return res.status(201).json({message: 'password successfully updated'})

    } catch (e) {
      return res.status(404).json({error: 'could not update password'})
    }
  },
  update_profile_details: async (req, res) => {
    const userId = req.userData.userId
    const user = req.body
  
    const dbUser = User.findById(userId)
  
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
      return res.status(400).json({message: 'could not update user'})
    }
  
    return res.status(200).json({message: 'user profile successfully updated'})
  },
  delete_user: async (req, res) => {
    try {
      const userId = req.userData.userId
      await User.findByIdAndDelete(userId)
  
      return res.status(200).json({message: 'user account successfully deleted'})
    } catch (e) {
      return res.status(400).json({ message: 'could not delete user account'})
    }
  }
}

module.exports = userController