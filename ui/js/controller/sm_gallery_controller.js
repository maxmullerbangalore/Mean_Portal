maxmuller.controller('SiteMgmtGallery',function($scope,$http,galleryService){
console.log("SiteMgmtGallery");
// populate values for the album drop down
$scope.albumList = [];
$scope.previewImages = [];
$scope.album = {
    name:"",
    desc:"",
};
$scope.albumImageDesc="";
$scope.selectedAlbum="";

var albums = galleryService.getAlbumList();
albums.then(function(data){
    console.log("No of albums returned - " + data.length);
    console.dir(data);
    $scope.albumList = data;
});



$scope.onDropDownChange = function(event){
    console.log("SiteMgmtGallery#onDropDownChange");
    $scope.previewImages = [];
    //$scope.selectedAlbum =
    console.log($scope.selectedAlbum);
}

function createAlbumDropDown(){
    console.log("SiteMgmtGallery#createAlbumDropDown");
    $("#photoAlbumID").kendoComboBox({
    	dataTextField: "name",
        dataValueField: "_id",
        dataSource: $scope.albumList,
        filter: "contains",
        suggest: true,
        change:onDropDownChange,
        index: 0
    });
}

// Save the Album
$scope.onAlbumSave = function(){
    console.log("SiteMgmtGallery#onAlbumSave");
    console.dir($scope.album);
    $http({
        method: 'POST',
        url: '/rest/api/galery/addAlbum',
        data: $scope.album
    })
    .success(function(albumList){
        console.log("SiteMgmtGallery#onAlbumSave#success");
        console.dir(albumList);
        $scope.albumList = albumList;
        //createAlbumDropDown();
    })
    .error(function(error){
        console.log("error while saving an album.Error Details : " + error);
    });
};

// When the user clicks the cancel button, delete all uploaded images
$scope.onAlbumImageUploadCancel = function(){
    console.log("SiteMgmtGallery#onAlbumImageUploadCancel");
    console.dir($scope.previewImages);
    // delete the images
     $http({
            method: 'POST',
            url: '/rest/api/gallery/deletePhotos',
            data: $scope.previewImages
        })
        .success(function(albumList){
            console.log("Successfully Deleted all Images");
            $scope.previewImages = albumList;
        })
        .error(function(error){
            console.log("error while deleting images.Error Details : " + error);
        });

}

// When the User uploads images to album & clicks on save
$scope.onAlbumImageSave = function(){
    console.log("SiteMgmtGallery#onAlbumImageSave");
    $http({
            method: 'POST',
            url: '/rest/api/gallery/saveAlbumImages',
            data: {
                album_id:$scope.selectedAlbum,
                album_images:$scope.previewImages
            }
        })
        .success(function(status){
            console.log(status);
            $scope.previewImages = [];
        })
        .error(function(errorStatus){
            console.log(errorStatus);
        });

};

$scope.onAlbumImageDelete = function(){
    console.log("SiteMgmtGallery#onAlbumImageDelete" + $scope.selectedAlbum);
    var albumList = galleryService.deleteAlbum($scope.selectedAlbum);
    albumList.then(function(data){
         console.log("No of albums returned - " + data.length);
         console.dir(data);
         $scope.albumList = data;
         $scope.selectedAlbum="Select Album";
         //createAlbumDropDown();
    });
};

$scope.onAlbumImageUpload = function(uploadedImage){
    console.log("SiteMgmtGallery#onAlbumImageUpload");
    if (uploadedImage.files && uploadedImage.files[0]) {
        var albumImageForm = new FormData();
        albumImageForm.append('file', uploadedImage.files[0]);
        albumImageForm.append('imageDesc', $scope.albumImageDesc);
        $http.post('/rest/api/gallery/addPhoto', albumImageForm, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(imagePath){
            console.log('SiteMgmtHomeScreen#onSave#Success Image Path - ' + imagePath);
            console.log(imagePath);
            console.dir($scope.previewImages);
            $scope.previewImages.push(imagePath);
            console.dir($scope.previewImages);
        })
        .error(function(error){
            console.log('SiteMgmtHomeScreen#onSave#Error');
        });
    }
};

$scope.onAlbumImageAddMore = function(){
    console.log("SiteMgmtGallery#onAlbumImageAddMore");
    $scope.albumImageDesc="";
};


});