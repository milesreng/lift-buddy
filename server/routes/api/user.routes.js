const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')
const validator = require('validator')

const User = require('../../models/user.model')

router.get('/profile', checkAuth, async (req, res) => {
  try {
    const uid = req.params.uid
    const user = await User.findById(uid)

    res,json(user)
  } catch (e) {
    res.status(404).json({ message: 'user not found' })
  }
})

// @route   POST api/users
// @desc    Update user email
// @access  Public
router.post('/update/email', async (req, res) => {
  try {
    const user = req.body

    if (!validator.isEmail(user.email)) {
      res.json({message: 'incorrect email format'})
      return
    }

    const existEmail = await User.findOne({email: user.email})

    if (existEmail) {
      res.json({message: 'email has already been taken'})
    }

    await User.findByIdAndUpdate(user._id, {
      email: user.email
    })
    
    res.json({message: 'email successfully updated'})
  } catch (e) {
    res.status(404).json({message: 'could not update email'})
  }
})

// @route   POST api/users
// @desc    Update user password
// @access  Public
router.post('/update/password', async (req, res) => {
  try {
    const user = req.body

    if (!validator.isStrongPassword(user.password)) {
      res.json({message: 'password too weak'})
      return
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword
    })

    res.json({message: 'password successfully updated'})

  } catch (e) {
    res.status(404).json({message: 'could not update password'})
  }
})

// @route   POST api/users
// @desc    Update user profile
// @access  Public
router.post('/update/profile', async (req, res) => {
  try {
    const user = req.body

    const dbUser = User.findById(user._id)
    if (user.firstname) {
      dbUser.firstname = user.firstname
    }

    if (user.lastname) {
      dbUser.lastname = user.lastname
    }

    await dbUser.save()
    res.json({message: 'user profile successfully updated'})
    
  } catch (e) {
    res.status(404).json({message: 'could not update user profile'})
  }
})

// @route   DELETE api/users
// @desc    Delete user account
// @access  Public
router.delete('/delete', async (req, res) => {
  try {
    const user = req.body
    await User.findByIdAndDelete(user._id)

    res.json({message: 'user account successfully deleted'})
  } catch (e) {
    res.json({message: 'user account could not be deleted'})
  }
})

module.exports = router