var path = require('path');
var fs = require('fs');
var mongoDBConnURI = "mongodb://maxmulleradmin:maxmulleradmin@localhost:27017/maxmuller";

module.exports = function(app,currentDir){
    var userDAOPath = path.join(currentDir,'node','dao','UserDAO.js');
    console.log("User_Routes.js#Content DAO Path - " + userDAOPath);
    var userDAO = require(userDAOPath);
    // set the DB connection URI
    userDAO.setDBConnection(mongoDBConnURI);

    // User Login
    app.post('/rest/api/login/userLogin',function(request,response){
        console.log("User_Routes#/rest/api/login/userLogin");
        var loginJSON = request.body;
        console.dir(loginJSON);
        var userId = loginJSON.userID;
        var password = loginJSON.password;

        userDAO.getUserByID(userId,function(user){
            console.log("The no of users retrieved from DB - " + user.length);
            if(user.length > 0 && user[0].password == password) {
                console.log("The user password matches");
                response.json({
                    status:'SUCCESS'
                });    
            }
            else {
                console.log("The user password does not match");
                response.json({
                    status:'FAILURE'
                });    
            }
        },function(error){
            console.log("User_Routes#/rest/api/login/userLogin Error:" + error);
            response.json({
                status:'FAILURE'
            });
        });
    });

};