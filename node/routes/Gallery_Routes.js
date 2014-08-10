var path = require('path');
var fs = require('fs');
var mongoDBConnURI = "mongodb://maxmulleradmin:maxmulleradmin@localhost:27017/maxmuller";

module.exports = function(app,currentDir){
    var galleryDAOPath = path.join(currentDir,'node','dao','GalleryDAO.js');
    console.log("Gallery_Routes.js#Gallery DAO Path - " + galleryDAOPath);
    var galleryDAO = require(galleryDAOPath);
    // set the DB connection URI
    galleryDAO.setDBConnection(mongoDBConnURI);


    // Define REST api handlers

    // get the list of all Album
    app.get('/rest/api/gallery/albums',function(request,response){
        console.log("Gallery_Routes#/rest/api/gallery/albums");
        galleryDAO.getAlbums(function(albumList){
            console.log("The no of albums retrieved from DB - " + albumList.length);
            response.json(albumList);
        },function(error){
            console.log("Gallery_Routes#/rest/api/gallery/albums Error:" + error);
            response.json([]);
        });
    });

    // get the list of all Album having images
    app.get('/rest/api/gallery/albumImages',function(request,response){
        console.log("Gallery_Routes#/rest/api/gallery/albumImages");
        galleryDAO.getAlbumImages(function(albumImagesList){
            console.log("The no of albums Images retrieved from DB - " + albumImagesList.length);
            response.json(albumImagesList);
        },function(error){
            console.log("Gallery_Routes#rest/api/gallery/albumImages Error:" + error);
            response.json([]);
        });
    });

    // get the Album document by id
    app.get('/rest/api/gallery/album/:id?',function(request,response){
        console.log("Gallery_Routes#/rest/api/gallery/album/ " + request.params.id);
        var albumID = request.params.id;
        galleryDAO.getAlbumByID(albumID,function(album){
            console.dir(album);
            response.json(album);
        },function(error){
            console.log("Gallery_Routes#/rest/api/gallery/album/ " + error);
            response.json({});
        });
    });

    // save the Album document
    app.post('/rest/api/galery/addAlbum',function(request,response){
        console.log("Gallery_Routes#/rest/api/galery/addAlbum");
        var gallery = [];
        var newAlbum = {
            name:"",
            desc:"",
            createdDate: new Date(),
            updatedDate:new Date()
        };
        // Get the values from the form. Redo if there is a better way
        newAlbum.name = request.body.name;
        newAlbum.desc = request.body.desc;
        console.dir(newAlbum);
        // Save
        galleryDAO.saveAlbum(newAlbum,function(album){
            console.log("Saved Carousel " + album);
            // Get the list of Carousels
            galleryDAO.getAlbums(function(albumList){
                    console.log("The no of albums retrieved from DB - " + albumList.length);
                    response.json(albumList);
                },function(error){
                    console.log("Error when retrieving the list of albums " + error);
                    response.json([]);
                });
        },function(error){
            console.log("Gallery_Routes#/rest/api/galery/addAlbum " + error);
            response.json([]);
        })
    });

        // Save Photos to Album
    app.post('/rest/api/gallery/saveAlbumImages',function(request,response){
        console.log("Gallery_Routes#/rest/api/gallery/saveAlbumImages");
        // The Photos have already been copied to the folders thru /rest/api/gallery/addPhoto
        var albumID = request.body.album_id;
        var albumImages = request.body.album_images;
        var albumImageJSON = {
            album_id:"",
            createdDate:new Date(),
            updatedDate:new Date(),
            images:[]
        }
        // Add Entry to Album_Images
        albumImageJSON.album_id = albumID;
        albumImageJSON.images = albumImages;
        console.dir(albumImageJSON);

        // Save Images From Album
        galleryDAO.saveImagesToAlbum(albumImageJSON,function(albumImage){
        console.log("Saved Images to Album " + albumImage);
        // Get the list of Carousels
        galleryDAO.getAlbums(function(albumImage){
            response.json({
                status:'Images Successfully Added to Album'
            });
            },function(error){
                console.log("Gallery_Routes#/rest/api/gallery/saveAlbumImages " + error);
                response.json({
                    status:'Images Not Added to Album'
                });
            });
        });
    });

    deleteImagesFromAlbum = function(albumID) {
        console.log("deleteImagesFromAlbum Album ID - " + albumID);
        // get the list of images for the album from album_images collection
        var status = false;
        galleryDAO.getImagesFromAlbumID(albumID,function(photoList){
            console.log("Successfully deleted Images");
            for(image in photoList) {
                var imagePath = photoList[image].imagePath;
                var fileToDelete = path.join(currentDir,'ui',imagePath);
                console.log("Goind to delete Image " + fileToDelete);
                fs.unlink(fileToDelete, function (error) {
                    if (error) {
                        console.log('unable to delete '  + fileToDelete);
                    }
                    console.log('successfully deleted ' + fileToDelete);
                });
            }
            status = true;
        },function(error){
            console.log("Error when deleting Images ... ");
        });
        return status;
    }


    // delete the Album document
    app.delete('/rest/api/gallery/deleteAlbum/:id?',function(request,response){
        var albumID = request.params.id;
        console.log("Gallery_Routes#/rest/api/gallery/deleteAlbum/ ID = " + albumID);
        // Delete the Images
        var isDeleted = deleteImagesFromAlbum(albumID);
        // Delete
        galleryDAO.deleteAlbum(albumID,function(){
            // Get the list of albums
            galleryDAO.getAlbums(function(albumList){
                    console.log("The no of albums retrieved from DB - " + albumList.length);
                    response.json(albumList);
                },function(error){
                    console.log("Gallery_Routes#/rest/api/gallery/deleteAlbum/ " + error);
                    response.json(error);
                });
        },function(error){
            console.log("Gallery_Routes#/rest/api/gallery/deleteAlbum/ " + error);
            response.json(error);
        });
    });

    // update the Album document
    app.post('/rest/api/gallery/updateAlbum/:id?',function(request,response){
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


    // Add Image to Album
    app.post('/rest/api/gallery/addPhoto',function(request,response){
        console.log("Gallery_Routes#//rest/api/gallery/addPhoto");
        // Copy the uploaded image file & return the new path of the file
        // Copy the image
        var fullFileTempPath = request.files.file.path;
        var imageDesc = request.body.imageDesc;
        console.log("Full Path - " + fullFileTempPath);
        var imageDbPath = path.join('uploaded_images','gallery',request.files.file.name);
        var copyToPath = path.join(currentDir,'ui','uploaded_images','gallery',request.files.file.name);
        console.log("File will be copied to - " + copyToPath);
        var inFile = fs.createReadStream(fullFileTempPath);
        var outFile = fs.createWriteStream(copyToPath);
        inFile.pipe(outFile);

        response.json({
            imagePath:imageDbPath,
            imageDesc:imageDesc
        });
    });


    // Delete Photos
    app.post('/rest/api/gallery/deletePhotos',function(request,response){
        console.log("Gallery_Routes#//rest/api/gallery/deletePhotos");
        // Delete the Images;
        console.dir(request.body);
        var previewPhotos = request.body;
        console.log("No of array items = " + previewPhotos.length);
        for(image in previewPhotos) {
            var imagePath = previewPhotos[image].imagePath;
            var fileToDelete = path.join(currentDir,'ui',imagePath);
            fs.unlink(fileToDelete, function (error) {
                if (error) {
                    console.log('unable to delete '  + fileToDelete);
                }
                console.log('successfully deleted ' + fileToDelete);
            });
        }
        response.json([]);
    });

};