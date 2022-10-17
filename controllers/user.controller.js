const fs = require('fs');
const { getRandomUserService, getRandomUsersService } = require('../services/user.service');

exports.getRandomUser = (req, res, next) => {
    const randomUser = getRandomUserService();
    res.status(200).json({ success: true, data: randomUser });
}

exports.getRandomUsers = (req, res, next) => {
    const users = getRandomUsersService(req.query);
    res.status(200).json({ success: true, data: users });
}

