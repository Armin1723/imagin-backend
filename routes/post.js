const express = require("express");
const router = express.Router();
const { sharePost, fetchPost } = require('../functions/postFunctions')

router.get('/share',sharePost)
router.post('/fetch',fetchPost)

module.exports = router