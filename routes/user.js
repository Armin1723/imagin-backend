const express = require("express");
const router = express.Router();
const { login, signup, verifyMail } = require('../functions/userFunctions');

router.post('/login',login)
router.post('/signup',signup)
router.get('/verify',verifyMail)


module.exports = router