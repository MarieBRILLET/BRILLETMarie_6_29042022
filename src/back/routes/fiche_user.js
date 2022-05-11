//importation
const express = require('express');

//importation controller
const fiche_userController = require('../controllers/fiche_user');

//fonction router()
const router = express.Router();

//route (endpoint)
router.post('/', fiche_userController.createFiche_user);

router.get('/', fiche_userController.getFiche_user);

//exportation module
module.exports = router;