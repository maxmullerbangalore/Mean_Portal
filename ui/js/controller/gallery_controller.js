maxmuller.controller('GalleryController',function($scope,galleryService){
	console.log("GalleryController");

    $scope.galleryImageList = [];
    $scope.carouselInterval = 3000;
    // Get the list of Images Uploaded
    var albums = galleryService.getAlbumImageList();
    albums.then(function(data){
        console.log("No of albums returned - " + data.length);
        console.dir(data);
        $scope.albumList = data;
    });

    // Get the Album's Details
    // This function is called by gallery_directive.js
    $scope.getAlbumName = function(albumID) {
        console.log("GalleryController#getAlbumName AlbumID - " + albumID);
        var albumPromise = galleryService.getAlbum(albumID);
        var albumName="";
        albumPromise.then(function(data){
            console.log("Album Details returned - " + data);
            console.dir(data);
            albumName = data.name;
        });
        console.log("Album Details Name - " + albumName);
    };

    $scope.loadAlbumImages = function(album){
        console.log("GalleryController#loadAlbumImages");
        var images = album.images;
        console.log("GalleryController#loadAlbumImages No.Of.Images - " + images.length);
        $scope.galleryImageList = images;
    };
});
