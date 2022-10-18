const express = require('express');
const userController = require('../../controllers/user.controller');
const router = express.Router();

router
    .get('/random', userController.getRandomUser)
    .get('/all', userController.getRandomUsers)
    .post('/save', userController.saveUser)
    .patch('/update/:id', userController.updateUser)
    .patch('/bulk-update', userController.bulkUpdateUsers)
    .delete('/delete/:id', userController.deleteUser)

module.exports = router;
