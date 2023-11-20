const express = require("express");
const router = express.Router();
const { savePost, fetchPost, sharePost } = require('../functions/postFunctions')

router.post('/save',savePost)
router.post('/share',sharePost)
router.get('/fetch',fetchPost)

module.exports = router