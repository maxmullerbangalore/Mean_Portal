var path = require('path');
var fs = require('fs');
var mongoDBConnURI = "mongodb://maxmulleradmin:maxmulleradmin@localhost:27017/maxmuller";

module.exports = function(app,currentDir){
    var homeDAOPath = path.join(currentDir,'node','dao','HomeDAO.js');
    console.log("Home_Routes.js#HOME DAO Path - " + homeDAOPath);
    var homeDAO = require(homeDAOPath);
    // set the DB connection URI
    homeDAO.setDBConnection(mongoDBConnURI);

    // Define REST api handlers

    // get the list of all HomeCarousel documents
    app.get('/rest/api/home/carousels',function(request,response){
        var carousels = [];
        console.log("Home_Routes#/rest/api/home/carousels");
        homeDAO.getHomeCarousels(function(carouselList){
            console.log("The no of carousels retrieved from DB - " + carouselList.length);
            response.json(carouselList);
        },function(error){
            console.log("Home_Routes#/rest/api/home/carousels Error:" + error);
            response.json(carousels);
        });
    });

    // get the HomeCarousel document by id
    app.get('/rest/api/home/carousel/:id?',function(request,response){
        console.log("Home_Routes#/rest/api/home/carousel " + request.route);
        var carouselID = request.params.id;
        homeDAO.getHomeCarouselByID(carouselID,function(carousel){
            response.json(carousel);
        },function(error){
            console.log("Home_Routes#/rest/api/home/carousel " + error);
            response.json([]);
        });
    });

    // save the HomeCarousel document
    app.post('/rest/api/home/addCarousel',function(request,response){
        console.log("Home_Routes#/rest/api/home/addCarousel");
        var carousels = [];
        var newCarousel = {
        };

        // Get the values from the form. Redo if there is a better way
        newCarousel.title = request.body.title;
        newCarousel.desc = request.body.desc;

        // copy the uploaded file to server & update the path
        // Copy the image
        var fullFileTempPath = request.files.file.path;
        console.log("Full Path - " + fullFileTempPath);
        var carouselDbPath = path.join('uploaded_images','carousel',request.files.file.name);
        var copyToPath = path.join(currentDir,'ui','uploaded_images','carousel',request.files.file.name);
        console.log("File will be copied to - " + copyToPath);
        var inFile = fs.createReadStream(fullFileTempPath);
        var outFile = fs.createWriteStream(copyToPath);
        inFile.pipe(outFile);
        // image path
        newCarousel.imagePath = carouselDbPath;

        newCarousel.createdDate = new Date();
        newCarousel.updatedDate = new Date();

        // Save
        homeDAO.saveHomeCarousel(newCarousel,function(carousel){
            console.log("Saved Carousel " + carousel);
            // Get the list of Carousels
            homeDAO.getHomeCarousels(function(carouselList){
                    console.log("The no of carousels retrieved from DB - " + carouselList.length);
                    carousels = carouselList;
                },function(error){
                    console.log("Home_Routes#/rest/api/home/carousels " + error);
                    console.log("Home_Routes#/rest/api/home/carousels " + error);
                });

        },function(error){
            console.log("Home_Routes#/rest/api/home/addCarousel " + error);
        })
        response.json(carousels);
    });

    // delete the HomeCarousel document
    app.delete('/rest/api/home/deleteCarousel/:id?',function(request,response){
        var carouselID = request.params.id;
        console.log("Home_Routes#/rest/api/home/deleteCarousel ID = " + carouselID);
        // Delete
        homeDAO.deleteHomeCarousel(carouselID,function(){
            // Get the list of Carousels
            homeDAO.getHomeCarousels(function(carouselList){
                    console.log("The no of carousels retrieved from DB - " + carouselList.length);
                    response.json(carouselList);
                },function(error){
                    console.log("Home_Routes#/rest/api/home/deleteCarousel " + error);
                    response.json(error);
                });
        },function(error){
            console.log("Home_Routes#/rest/api/home/deleteCarousel " + error);
            response.json(error);
        });

    });

    // update the HomeCarousel document
    app.post('/rest/api/home/updateCarousel/:id?',function(request,response){
        console.log("Home_Routes#/rest/api/home/updateCarousel");
        var carouselID = request.params.id;
        var carousels = [];
        var existingCarousel = {
        };

        var isImageUpdated = request.body.isImageUpdated;

        // Copy the Image to FS if isImageUpdated is true
        // Copy the image
        console.log("Home_Routes#/rest/api/home/updateCarousel isImageUpdated - " + isImageUpdated);
        if(isImageUpdated == 'true') {
            var fullFileTempPath = request.files.file.path;
            console.log("Full Path - " + fullFileTempPath);
            var carouselDbPath = path.join('uploaded_images','carousel',request.files.file.name);
            var copyToPath = path.join(currentDir,'ui','uploaded_images','carousel',request.files.file.name);
            console.log("File will be copied to - " + copyToPath);
            var inFile = fs.createReadStream(fullFileTempPath);
            var outFile = fs.createWriteStream(copyToPath);
            inFile.pipe(outFile);
            // image path
            existingCarousel.imagePath = carouselDbPath;
        }
        else {
            existingCarousel.imagePath = request.body.imagePath;
        }

        // Get the values from the form. Redo if there is a better way
        existingCarousel.title = request.body.title;
        existingCarousel.desc = request.body.desc;
        existingCarousel.createdDate = request.body.createdDate;
        existingCarousel.updatedDate = new Date();

        console.log("Home_Routes#/rest/api/home/updateCarousel existingCarousel" + existingCarousel + " Carousel ID = " + carouselID);

        // Save
        homeDAO.updateHomeCarousel(carouselID,existingCarousel,function(carousel){
            console.log("Updated Carousel " + carousel);
            // Get the list of Carousels
            homeDAO.getHomeCarousels(function(carouselList){
                    console.log("The no of carousels retrieved from DB - " + carouselList.length);
                    response.json(carouselList);
                },function(error){
                    console.log("Home_Routes#/rest/api/home/carousels " + error);
                    response.json([]);
                });

        },function(error){
            console.log("Home_Routes#/rest/api/home/updateCarousel " + error);
            response.json([]);
        });
    });

};