//importation
const express = require('express');
//importation controller
const userController = require('../controllers/user');

//fonction router()
const router = express.Router();

//route (endpoint) signup
router.post("/signup", userController.signup);

//exportation module
module.exports = router;