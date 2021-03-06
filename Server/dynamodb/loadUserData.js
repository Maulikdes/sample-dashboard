var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "ap-south-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing users into DynamoDB. Please wait.");

var allUsers = JSON.parse(fs.readFileSync('userdata.json', 'utf8'));
allUsers.forEach(function(user) {
    var params = {
        TableName: "Users",
        Item: {
            "id":  user.id,
            "name": user.name,
            "email":  user.email,
            "role":  user.role,
            "status": user.status,
            "mobile": user.mobile
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add user", user.title, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", user.title);
       }
    });
});
