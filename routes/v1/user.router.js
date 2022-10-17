const express = require('express');
const userController = require('../../controllers/user.controller');
const router = express.Router();

router
    .get('/random', userController.getRandomUser)
    .get('/all', userController.getRandomUsers)

module.exports = router;
