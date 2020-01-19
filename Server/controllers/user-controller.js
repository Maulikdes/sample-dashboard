const userService = require('../services/user-service');
const uuidv1 = require('uuid/v1');
const userValidationUtils = require('../utils/user-validation');

// Method to get all the users
exports.getUsers = function (req, res) {
    userService.getUsers(function (data) {
        res.send(data);
    });
};

// Method to get specific user
exports.getUser = function (req, res) {
    var userId = req.params.id;
    var successCallback = function (data) {
        res.send(data);
    }
    var errCallback = function (err) {
        res.status(500).send({ message: err });
    }
    userService.getUser(userId, successCallback, errCallback)
};

// Method to create a user
exports.createUser = function (req, res) {
    var user = req.body;
    var successCallback = function (data) {
        res.send(data);
    }
    var errCallback = function (err) {
        res.status(500).send({ message: err });
    }
    // user validation
    var userValidationResult = userValidationUtils.validateUser(user);
    if (!userValidationResult.userValidated) {
        res.status(400).send({ message: userValidationResult.messages.join(", ") });
        return;
    }
    // generate uuid for new user
    user.id = uuidv1();
    userService.createUser(user, successCallback, errCallback);
};

// Method to update a user
exports.updateUser = function (req, res) {
    var user = req.body;
    
    // user validation
    var userValidationResult = userValidationUtils.validateUser(user);
    if (!userValidationResult.userValidated) {
        res.status(400).send({ message: userValidationResult.messages.join(", ") });
        return;
    }
    
    var successCallback = function (data) {
        res.send(data);
    }
    var errCallback = function (err) {
        res.status(500).send({ message: err });
    }
    userService.updateUser(user, successCallback, errCallback)
};

// Method to delete a user
exports.deleteUser = function (req, res) {
    var userId = req.params.id;
    var successCallback = function (data) {
        res.send(data);
    }
    var errCallback = function (err) {
        res.status(500).send({ message: err });
    }
    userService.deleteUser(userId, successCallback, errCallback);
};
