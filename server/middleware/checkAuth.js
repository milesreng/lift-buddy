const jwt = require('jsonwebtoken')

function checkAuth(req, res, next) {
  try {
    const token = req.headers['x-access-token']
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    req.userData = { userId: decodedToken.userId, email: decodedToken.email }
    next()
  } catch (e) {
    return res.status(401).json({ error: 'user authentication failed' })
  }
}

module.exports = checkAuth