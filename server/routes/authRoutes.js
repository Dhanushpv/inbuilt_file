const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authControllers =require('../uploads/datas/datas.json')



router.post('/login',authController.login);


module.exports = router;