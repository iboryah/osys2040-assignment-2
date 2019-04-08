const express = require('express')
const createError = require('http-errors')
const Chat = require('../model/chat')
const Likes = require('../model/likes')

const router = express.Router()

router.get('/chat', async function getMessages(req, res, next) {
  const messages = await Chat.getMessages()

  // TODO: create like model
  // TODO: get like count from like model
  const likeCount = 0
  // TODO: get whether signed in user likes this from model
  const iLikeThis = true


  res.render('messages', { messages, likeCount, iLikeThis })
})

// click like button send post here
router.post('/chat/:messageId/like', async function userLikes(req, res, next) {
  await Likes.createLike(res.locals.signedInAs, req.params.messageId)
  // TODO: if (req.body.like) add like to model
  // TODO: else remove like from model

  res.redirect('/chat')
})

router.post('/chat/create-message', async function createMessage(req, res, next) {
  if (!res.locals.signedInAs) {
    return next(createError(401))
  }

  const message = req.body.message
  if (!message) {
    return next(createError(400, 'missing message'))
  }
  // console.log(res.locals.signedInAs + "/////" + message)
  await Chat.createMessage(res.locals.signedInAs, {
    message: message,
  })
  // await Likes.createLikeTable()
  res.redirect('/chat')
})

module.exports = router
