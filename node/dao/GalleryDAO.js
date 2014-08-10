// mongojs driver
var mongojs = require('mongojs');
// mongodb connection uri
var mongoDBConnURI = null;
// Connect to Album Collection
var albumCollection = null;
// Connecto to Album_Images Collection
var albumImageCollection = null;

// set the DB connection
exports.setDBConnection = function(connectionURI){
    console.log("GalleryDAO#setDBConnection URI - " + connectionURI);
    mongoDBConnURI = connectionURI;
    albumCollection = mongojs.connect(mongoDBConnURI,["Album"]);
    albumImageCollection = mongojs.connect(mongoDBConnURI,["Album_Images"]);
};

// Get list of all Albums
exports.getAlbums = function(successCB,failureCB){
    console.log("GalleryDAO#getAlbums");
    var albums = [];
    // Find the list of all albums
    albumCollection.Album.find(function(error,albumList){
        if(error) {
            console.log("GalleryDAO#getAlbums.Error when fetching the list of albums");
            console.log("GalleryDAO#getAlbums.Error Details - " + error);
            failureCB(error);
        }
        else if (!albumList) {
            console.log("GalleryDAO#getAlbums.No Albums exists in DB");
            successCB(null);
        }
        else {
            albums = albumList;
            successCB(albums);
        }
    });
};

// Get the List of all Albums having Images
exports.getAlbumImages = function(successCB,failureCB){
    console.log("GalleryDAO#getAlbumImages");
    var albums = [];
    // Find the list of all albums
    albumImageCollection.Album_Images.find(function(error,albumImageList){
        if(error) {
            console.log("GalleryDAO#getAlbumImages.Error when fetching the list of album with images");
            console.log("GalleryDAO#getAlbumImages.Error Details - " + error);
            failureCB(error);
        }
        else if (!albumImageList) {
            console.log("GalleryDAO#getAlbumImages.No Albums with Images exists in DB");
            successCB(null);
        }
        else {
            albums = albumImageList;
            successCB(albums);
        }
    });
};

// Get Album by ID
exports.getAlbumByID = function(albumID,successCB,failureCB){
    console.log("GalleryDAO#getAlbumByID ID = " + albumID);
    // Get the Album by ID
    albumCollection.Album.find({_id:mongojs.ObjectId(albumID)},function(error,album){
        if(error) {
            console.log("GalleryDAO#getAlbumByID.Error when fetching the album");
            console.log("GalleryDAO#getAlbumByID.Error Details - " + error);
            failureCB(error);
        }
        else if (!album) {
            console.log("GalleryDAO#getAlbumByID.No Album exists in DB");
            successCB(null);
        }
        else {
            successCB(album);
        }
    });
};

// Save Album
exports.saveAlbum = function(albumJSON,successCB,failureCB){
    console.log("GalleryDAO#saveAlbum JSON - " + albumJSON);

    // Save the JSON
    albumCollection.Album.save(albumJSON,function(error,savedDoc){
        if(error){
            console.log("GalleryDAO#saveAlbum.Error when saving the album");
            console.log("GalleryDAO#saveAlbum.Error Details - " + error);
            failureCB(error);
        }
        else if (!savedDoc) {
            console.log("GalleryDAO#saveAlbum.Unable to save");
            successCB(null);
        }
        else {
            successCB(savedDoc);
        }
    });
};

// Update Album
exports.updateAlbum = function(albumID,albumJSON,successCB,failureCB) {
    console.log("GalleryDAO#updateAlbum JSON - " + albumJSON + " Album ID = " + albumID);

    // Update the Album
     albumCollection.Album.update({_id:mongojs.ObjectId(albumID)},albumJSON,function(error,updatedDoc){
        if(error){
            console.log("GalleryDAO#updateAlbum.Error when updating the album");
            console.log("GalleryDAO#updateAlbum.Error Details - " + error);
            failureCB(error);
        }
        else if (!updatedDoc) {
            console.log("GalleryDAO#updateAlbum.Unable to update");
            successCB(null);
        }
        else {
            successCB(updatedDoc);
        }
     });
};

// Delete Album
exports.deleteAlbum = function(albumID,successCB,failureCB) {
    console.log("GalleryDAO#deleteAlbum ID - " + albumID);
    // Delete the Album_Images
    albumImageCollection.Album_Images.remove({album_id:albumID},function(error){
        if(error) {
            console.log("GalleryDAO#deleteAlbum_Images.Error while deleting the Album_Images");
            failureCB(error);
        }
        else {
            // Remove the Album
            albumCollection.Album.remove({_id:mongojs.ObjectId(albumID)},function(error){
                if(error){
                    console.log("GalleryDAO#deleteAlbum.Error when deleting the album");
                    failureCB(error);
                }
                else {
                    successCB();
                }
            });
        }
    });

};

// Get Images for the selected Album
exports.getImagesFromAlbumID = function(albumID,successCB,failureCB) {
    console.log("GalleryDAO#getImagesFromAlbumID ID - " + albumID);

    albumImageCollection.Album_Images.find({album_id:mongojs.ObjectId(albumID)},function(error,album){
        if(error){
            error("Error while trying to fetch the Images from Album_Images ");
            failureCB("Error");
        }
        else if(!album) {
            error("Unable to find Album matching the ID in Album_Images" + albumID);
            failureCB("No Album_Image exists");
        }
        else {
            successCB(album);
        }
    });
};

// Save Images to Album
exports.saveImagesToAlbum = function(albumImagesJSON,successCB,failureCB) {
    console.log("GalleryDAO#saveImagesToAlbum Album Images - " + albumImagesJSON);
    albumImageCollection.Album_Images.save(albumImagesJSON,function(error,savedDoc){
        if(error){
            console.log("Error while trying to save Album_Images");
            failureCB("Error");
        }
        else if (savedDoc) {
            console.log("Saved the Doc - " + savedDoc);
            successCB(savedDoc);
        }
    });
}


// Remove Images from Album (Update)

