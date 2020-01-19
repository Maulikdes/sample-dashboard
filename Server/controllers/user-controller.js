const userService = require('../services/user-service');
const uuidv1 = require('uuid/v1');

// Method to get all the users
exports.getUsers = function (req, res) {
    userService.getUsers(function (data) {
        res.send(data);
    });
};

// Method to get specific user
exports.getUser = function (req, res) {
    var userId = req.params.id;
    userService.getUser(userId, function (data) {
        res.send(data);
    });
};

// Method to create a user
exports.createUser = function (req, res) {
    var user = req.body;
    user.id = uuidv1();
    userService.createUser(user, function (data) {
        res.send(data);
    });
};

// Method to update a user
exports.updateUser = function (req, res) {
    var user = req.body;
    userService.updateUser(user, function (data) {
        res.send(data);
    });
};

// Method to delete a user
exports.deleteUser = function (req, res) {
    var userId = req.params.id;
    userService.deleteUser(userId, function (data) {
        res.send(data);
    });
};