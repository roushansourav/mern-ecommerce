const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const {userSignupValidator} = require('../validators/userSignupValidator');
router.post('/signup',userSignupValidator, userController.signup);

module.exports = router;