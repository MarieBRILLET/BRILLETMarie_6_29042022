//importation
const express = require('express');
//importation middleware/password
const password = require('../middleware/password');
//importation controller
const userController = require('../controllers/user');

//fonction router()
const router = express.Router();

//route (endpoint) signup
router.post("/signup",password, userController.signup);

//route (endpoint) login
router.post("/login", userController.login);

//exportation module
module.exports = router;