const express = require('express');
const router = express.Router();
const authenController = require('../controllers/authen.controller');

router.post('/login', authenController.login);

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', authenController.register);

router.get('/register', (req, res) => {
    res.render('register');
});




module.exports = router;