const User = require('../users/users-model')

function logger(req, res, next) {
  console.log(req.method)
  console.log(req.originalUrl)
  console.log(new Date().toLocaleTimeString())
  next()
}

async function validateUserId(req, res, next) {
  const { id } = req.params 
  try {
    const user = await User.getById(id)
    if (!user) {
      res.status(404).json(`Unable to find ${id}`)
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json('unable to retrieve user by id')
  }
}

function validateUser(req, res, next) {
  const name = req.body
  if (!name || !name.trim()) {
    res.status(400).json('name required')
  } else {
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  const post = req.body

  if (!post) {
    res.status(400).json('missing required post field')
  } else {
    req.post = post
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}