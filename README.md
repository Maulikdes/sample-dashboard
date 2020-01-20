# sample-dashboard
This project is a sample dashboard app built in node JS, Angular v8 and dynamoDB database.

## Instructions to run this project

These instructions will get you a copy of the project up and running on your local machine for development and testing 

### Prerequisites

For running this project node v10 or higher, java v7 or higher and aws client needed to be installed in machine 

For installing aws cli in ubuntu, run following command
```
sudo apt install awscli
```
Windows user can follow link to install the aws cli
```
https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html
```

### Installation and Deployment

First of all configure aws cli config. For that run follwing command
```
aws configure
AWS Access Key ID [None]: Test
AWS Secret Access Key [None]: Test
Default region name [None]: ap-south-1
Default output format [None]: json
```
Now go to DB/dynamodb_local_latest folder and run the db using command. This will start the db
```
java -D"java.library.path=./DynamoDBLocal_lib" ar DynamoDBLocal.jar -sharedDb
```

Go to Server folder and run commands to start the server
```
npm install
```
```
npm start
```
Go to the Client folder and run following commands
```
npm install
```
```
ng serve
```

### Notes
One can also test ui with the json-server if don't want to run db and server
go to json-server folder and run
```
npm install
```
```
npm start
```

To change the server rest end point open Client/src/app/environment/environment.ts and set the appropriate rest_url
To change the db url go to Server/configuration/config.js and set appropriate dbUrl

In the Server folder there are scripts of creating a table, loading the data from json and deleting a table, The data is already loaded in the db so do not need to run that, but incase of loading other data or creating other tables we can use that. commands to run that scripts are added in Server/package.json file.


## Authors

* **Maulik Desai**
