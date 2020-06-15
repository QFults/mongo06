const router = require('express').Router()
const { Post, User } = require('../models')

router.get('/posts', (req, res) => {
  Post.find()
    .populate('author')
    .then(posts => res.json(posts))
    .catch(err => console.error(err))
})

router.post('/posts', (req, res) => {
  Post.create(req.body)
    .then(post => User.findByIdAndUpdate(req.body.author, { $push: { posts: post._id } }))
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err))
})

module.exports = router
