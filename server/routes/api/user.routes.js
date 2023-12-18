const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const User = require('../../models/user.model')

router.get('/profile', checkAuth, (req, res) => {
  User.findById(req.params.uid)
    .then(user => res.json({ ...user }))
    .catch((error) => {
      res.status(404).json({ message: 'user not found' })
    })
})

module.exports = router