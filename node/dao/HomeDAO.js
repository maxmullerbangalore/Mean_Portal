// mongojs driver
var mongojs = require('mongojs');
// mongodb connection uri
var mongoDBConnURI = null;
// Connect to Carousel Collection
var carouselCollection = null;

// set the DB connection
exports.setDBConnection = function(connectionURI){
    console.log("HomeDAO#setDBConnection URI - " + connectionURI);
    mongoDBConnURI = connectionURI;
    carouselCollection = mongojs.connect(mongoDBConnURI,["HomeCarousel"]);
};

// get the list of all HomeCarousel documents
exports.getHomeCarousels = function(successCB,failureCB){
    console.log("HomeDAO#getHomeCarousels");
    var homeCarousels = [];

    // Find the list of all carousels
    carouselCollection.HomeCarousel.find(function(error,carouselList){
        if(error) {
            console.log("HomeDAO#getHomeCarousels.Error when fetching the list of carousels");
            console.log("HomeDAO#getHomeCarousels.Error Details - " + error);
            failureCB(error);
        }
        else if (!carouselList) {
            console.log("HomeDAO#getHomeCarousels.No Carousels exists in DB");
            successCB(null);
        }
        else {
            homeCarousels = carouselList;
            successCB(homeCarousels);
        }
    });
};

// get the HomeCarousel document by id
exports.getHomeCarouselByID = function(carouselID,successCB,failureCB){
    console.log("HomeDAO#getHomeCarouselByID ID = " + carouselID);
    // Get the Carousel by ID
    carouselCollection.HomeCarousel.find({_id:mongojs.ObjectId(carouselID)},function(error,carousel){
        if(error) {
            console.log("HomeDAO#getHomeCarouselByID.Error when fetching the carousel");
            console.log("HomeDAO#getHomeCarouselByID.Error Details - " + error);
            failureCB(error);
        }
        else if (!carousel) {
            console.log("HomeDAO#getHomeCarouselByID.No Carousel exists in DB");
            successCB(null);
        }
        else {
            successCB(carousel);
        }
    });
};

// save the HomeCarousel document
exports.saveHomeCarousel = function(carouselJSON,successCB,failureCB){
    console.log("HomeDAO#saveHomeCarousel JSON - " + carouselJSON);

    // Save the JSON
    carouselCollection.HomeCarousel.save(carouselJSON,function(error,savedDoc){
        if(error){
            console.log("HomeDAO#saveHomeCarousel.Error when saving the carousel");
            console.log("HomeDAO#saveHomeCarousel.Error Details - " + error);
            failureCB(error);
        }
        else if (!savedDoc) {
            console.log("HomeDAO#saveHomeCarousel.Unable to save");
            successCB(null);
        }
        else {
            successCB(savedDoc);
        }
    });
};

// delete the HomeCarousel document
exports.deleteHomeCarousel = function(carouselID,successCB,failureCB) {
    console.log("HomeDAO#deleteHomeCarousel ID - " + carouselID);

    // Delete the Carousel
    carouselCollection.HomeCarousel.remove({_id:mongojs.ObjectId(carouselID)},function(error){
        if(error){
            console.log("HomeDAO#deleteHomeCarousel.Error when deleting the carousel");
            failureCB(error);
        }
        else {
            successCB();
        }
    });
};

// update the HomeCarousel document
exports.updateHomeCarousel = function(carouselID,carouselJSON,successCB,failureCB) {
    console.log("HomeDAO#updateHomeCarousel JSON - " + carouselJSON + " Carousel ID = " + carouselID);

    // Update the Carousel
     carouselCollection.HomeCarousel.update({_id:mongojs.ObjectId(carouselID)},carouselJSON,function(error,updatedDoc){
        if(error){
            console.log("HomeDAO#updateHomeCarousel.Error when saving the carousel");
            console.log("HomeDAO#updateHomeCarousel.Error Details - " + error);
            failureCB(error);
        }
        else if (!updatedDoc) {
            console.log("HomeDAO#updateHomeCarousel.Unable to update");
            successCB(null);
        }
        else {
            successCB(updatedDoc);
        }
     });
};