const express = require('express');
const router = express.Router();

const authCon = require('../controllers/authControllers');

// Authentication Routes
router.post('/signup', authCon.rejester); 
router.post('/signin', authCon.login);


module.exports = router;
