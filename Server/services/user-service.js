var AWS = require("aws-sdk");
var dbConfig = require("./../configuration/config");

// setting aws dynamo db
AWS.config.update({
    region: "ap-south-1",
    endpoint: dbConfig.dbUrl
});

var docClient = new AWS.DynamoDB.DocumentClient()
var tableName = "Users";

// Method to get all the users
exports.getUsers = function (callback, errCallback) {
    var params = {
        TableName: tableName
    };
    docClient.scan(params, onScan);
    function onScan(err, data) {
        if (err) {
            errCallback(JSON.stringify(err, null, 2));
        } else {
            callback(data.Items);
        }
    }
}

// Method to get a specific user
exports.getUser = function (id, callback, errCallback) {
    var params = {
        TableName: tableName,
        Key: {
            "id": id
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            errCallback(JSON.stringify(err, null, 2));
        } else {
            callback(data.Item);
        }
    });
}

// Method to add a user
exports.createUser = function (user, callback, errCallback) {
    var params = {
        TableName: tableName,
        Item: user
    };

    docClient.put(params, function (err, data) {
        if (err) {
            errCallback(JSON.stringify(err, null, 2));
        } else {
            // returning the created user
            params = {
                TableName: tableName,
                Key: {
                    "id": user.id
                }
            };
            docClient.get(params, function (err, data) {
                if (err) {
                    errCallback(JSON.stringify(err, null, 2));
                } else {
                    callback(data.Item);
                }
            });
        }
    });
}

// Method to update a user
exports.updateUser = function (user, callback, errCallback) {
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
            errCallback(JSON.stringify(err, null, 2));
        } else {
            var res = data.Attributes;
            res.id = user.id;
            callback(res);
        }
    });
}

// Method to delete a user
exports.deleteUser = function (id, callback, errCallback) {
    var params = {
        TableName: tableName,
        Key: {
            "id": id
        }
    };

    docClient.delete(params, function (err, data) {
        if (err) {
            errCallback(JSON.stringify(err, null, 2));
        } else {
            callback(data.Item);
        }
    });
}