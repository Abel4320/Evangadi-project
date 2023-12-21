const express = require('express');
const router = express.Router();
const { answerQ, getAnswer } = require('./answer.contorller');

router.post('/postanswer', answerQ)
router.get('/allanswers', getAnswer)
module.exports=router