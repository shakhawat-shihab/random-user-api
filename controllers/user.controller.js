const fs = require('fs');
const { getRandomUserService, getRandomUsersService, saveUserService, getAllUser } = require('../services/user.service');

exports.getRandomUser = (req, res, next) => {
    const randomUser = getRandomUserService();
    res.status(200).json({ success: true, data: randomUser });
}

exports.getRandomUsers = (req, res, next) => {
    const users = getRandomUsersService(req.query);
    res.status(200).json({ success: true, data: users });
}

exports.saveUser = (req, res, next) => {
    const newUser = req.body;
    const allUsers = getAllUser();
    if (newUser.id == null || newUser.gender == null || newUser.name == null || newUser.contact == null || newUser.address == null || newUser.photoUrl == null) {
        return res.status(401).send({ error: true, message: 'You must provide id, name, gender, contact number, address, photo Url' })
    }
    allUsers.push(newUser);
    saveUserService(allUsers)
    res.status(200).json({ success: true, message: "Added Successfully" });
}

exports.updateUser = (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
        return res.status(400).json({ success: false, message: "invalid id" });
    }
    const userInfo = req.body;
    const allUsers = getAllUser();
    // console.log('allUsers ', allUsers)
    let found = false;
    const updatedUser = allUsers.map(user => {
        if (user.id == id) {
            found = true;
            // userInfo.id && (user.id = userInfo.id);
            userInfo.name && (user.name = userInfo.name);
            userInfo.gender && (user.gender = userInfo.gender);
            userInfo.contact && (user.contact = userInfo.contact);
            userInfo.address && (user.address = userInfo.address);
            userInfo.photoUrl && (user.photoUrl = userInfo.photoUrl);
        }
        return user;
    })
    if (found === true) {
        saveUserService(updatedUser)
        return res.status(200).json({ success: true, message: "updated Successfully" });
    }
    res.status(400).json({ success: false, message: "No user found" });
}

exports.bulkUpdateUsers = (req, res, next) => {
    const userInfo = req.body;
    const allUsers = getAllUser();
    const idCount = userInfo.id.length;
    let found = 0;
    // console.log('allUsers ', allUsers)
    const updatedUsers = allUsers.map(user => {
        if (userInfo.id.includes(user.id)) {
            found += 1;
            userInfo.name && (user.name = userInfo.name);
            userInfo.gender && (user.gender = userInfo.gender);
            userInfo.contact && (user.contact = userInfo.contact);
            userInfo.address && (user.address = userInfo.address);
            userInfo.photoUrl && (user.photoUrl = userInfo.photoUrl);
        }
        return user;
    })
    // console.log('updatedUsers ', updatedUsers)
    if (found) {
        saveUserService(updatedUsers)
        return res.status(200).json({ success: true, message: `Bulk updated ${found} user Successfully, out of ${idCount}` });
    }
    res.status(400).json({ success: false, message: "No user found" });
}


exports.deleteUser = (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
        return res.status(400).json({ success: false, message: "invalid id" });
    }
    const allUsers = getAllUser();
    let isDeleted = false;
    const remaininUsers = allUsers.filter(user => {
        if (user.id != id) {
            return user
        }
        else {
            isDeleted = true;
        }
    })
    if (isDeleted === true) {
        saveUserService(remaininUsers)
        return res.status(200).json({ success: true, message: "deleted Successfully" });
    }
    res.status(400).json({ success: false, message: "No user found" });
}

