const fs = require('fs')
const path = require('path');
const directory = path.join('data', 'user.json')
exports.getRandomUserService = () => {
    const jsonData = fs.readFileSync(directory);
    const users = JSON.parse(jsonData)
    var randomUser = users[Math.floor(Math.random() * users.length)];
    return randomUser;
}

exports.getRandomUsersService = (query) => {
    const jsonData = fs.readFileSync(directory);
    const users = JSON.parse(jsonData)
    if (query?.limit) {
        const randomOrder = shuffleArray(users);
        return randomOrder.slice(0, query?.limit);
    }
    const randomOrder = shuffleArray(users);
    return randomOrder;
}

const saveUserData = (data) => {

    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}