const express = require("express");
const router = express.Router();
const { login, signup, verifyMail, fetchUser, fetchPosts } = require('../functions/userFunctions');

router.post('/login',login)
router.post('/signup',signup)
router.get('/verify',verifyMail)
router.post('/fetch',fetchUser)
router.post('/fetchPost',fetchPosts)


module.exports = router