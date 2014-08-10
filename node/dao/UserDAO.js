// mongojs driver
var mongojs = require('mongojs');
// mongodb connection uri
var mongoDBConnURI = null;
// Connect to User Collection
var userCollection = null;

// set the DB connection
exports.setDBConnection = function(connectionURI){
    console.log("GalleryDAO#setDBConnection URI - " + connectionURI);
    mongoDBConnURI = connectionURI;
    userCollection = mongojs.connect(mongoDBConnURI,["User"]);
};

// Get list of all Albums
exports.getUserByID = function(userId,successCB,failureCB){
    console.log("UserDAO#getUserByID userID - " + userId);
    
    userCollection.User.find({login_id:userId},function(error,user){
        if(error) {
            console.log("UserDAO#getUserByID.Error when fetching the user details");
            console.log("UserDAO#getUserByID.Error Details - " + error);
            failureCB(error);
        }
        else if (!user) {
            console.log("UserDAO#getUserByID.No user exists in DB");
            successCB(null);
        }
        else {
            console.dir(user);
            successCB(user);
        }
    });
};

