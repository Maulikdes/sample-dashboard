var user = require('../models/user')
var AWS = require("aws-sdk");

// setting aws dynamo db
AWS.config.update({
    region: "ap-south-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient()
var tableName = "Users";

// Method to get all the users
exports.getUsers = function (callback) {
    var params = {
        TableName: tableName
    };
    docClient.scan(params, onScan);
    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            callback(data.Items)
        }
    }
}

// Method to get a specific user
exports.getUser = function (id, callback) {
    var params = {
        TableName: tableName,
        Key: {
            "id": id
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            callback();
        }
    });
}

// Method to add a user
exports.createUser = function (user, callback) {
    var params = {
        TableName: tableName,
        Item: user
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            callback(data.Item);
        }
    });
}

// Method to update a user
exports.updateUser = function (user, callback) {
    var params = {
        TableName: tableName,
        Key: {
            "id": user.id
        },
        UpdateExpression: "set #n=:n, #e=:e, #r=:r, #s=:s, #m=:m",
        ExpressionAttributeValues: {
            ":n": user.name,
            ":e": user.email,
            ":r": user.role,
            ":s": user.status,
            ":m": user.mobile || null
        },
        ExpressionAttributeNames:{
            "#n": "name",
            "#e": "email",
            "#r": "role",
            "#s": "status",
            "#m": "mobile"
        },
        ReturnValues: "UPDATED_NEW"
    };

    docClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            var res = data.Attributes;
            res.id = user.id;
            callback(res);
        }
    });
}

// Method to delete a user
exports.deleteUser = function (id, callback) {
    var params = {
        TableName: tableName,
        Key: {
            "id": id
        }
    };

    docClient.delete(params, function (err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log(data);
            callback(data.Item);
        }
    });
}