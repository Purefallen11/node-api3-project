const express = require('express');
const usersModel = require('./users-model')

const {logger, validateUserId, validateUser, validatePost} = require('../middleware/middleware')

const router = express.Router();
router.use(logger)


router.get('/', (req, res) => {
  usersModel.get()
    .then((users) => {
    res.status(200).json(users)
    })
    .catch(() => {
    res.status(500).json('error getting database')
  })
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res) => {
  usersModel.insert(req.name)
    .then(newUser => {
    res.status(201).json(newUser)
    })
    .catch(() => {
    res.status(500).json('there was an error posting to database')
  })
});
  

router.put('/:id',validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: 'something went wrong',
    error: err.message
  })
})

// do not forget to export the router
module.exports = router