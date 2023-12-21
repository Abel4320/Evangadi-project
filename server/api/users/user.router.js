const express = require('express');
const auth =require('../users/middleware/auth')
const router = express.Router();
const  { createUser, getUsers, getUserById, login } = require('./user.controller')
router.post('/', createUser)
router.get('/all', getUsers)
router.get('/',auth, getUserById)
router.post('/login', login)
module.exports = router;

