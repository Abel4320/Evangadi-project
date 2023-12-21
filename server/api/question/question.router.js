// question.router.js
const express = require('express');
const router = express.Router();
const {askQuestions,getQuestions} = require('./question.controler');

router.post('/ask',askQuestions);
router.get('/allquestions',getQuestions);
module.exports = router;
