const express = require('express')
const router = express.Router()
const User = require('../../models/User')


router.get('/test', (req, res) => res.send("this is a test"))

// create user
router.post('/register', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  newUser.save()
    .then(user => res.json(user))
      .catch(err => res.json({msg: "Please enter valid credentials"}))
})

// login
router.post('/login', (req, res) => {
  User.findOne({email: req.body.email}).then(user => {
    if(user.password === req.body.password){
      user.looggedIn = true
      user.save()
      res.json(user)
    } else {
      res.json({msg: "Please enter valid credentials"})
    }
  })
})

// users
router.get('/', (req, res) => {
  User.find().then(user => res.json(user))
})

// logout
router.delete('/:userId/logout', (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      user.looggedIn = false
      user.save()
      res.json(user)
    })
})

module.exports = router
