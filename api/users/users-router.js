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
  

router.put('/:id',validateUserId, validateUser, async (req, res) => {
  const change = req.body
  const { id } = req.params
  const updates = await usersModel.insert(id, change)
  res.status(200).json(updates)
});

router.delete('/:id',validateUserId, async (req, res) => {
  try {
    const user = await usersModel.getById(req.user)
      .then(() => {
        usersModel.remove(user)
        res.status(200).json(user)
      }).catch(err => {
      res.status(500).json('cannot delete user')
    })
  } catch (err){
    res.status(500).json('there was an error deleting user')
  }
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