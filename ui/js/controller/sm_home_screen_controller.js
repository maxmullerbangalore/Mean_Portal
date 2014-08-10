maxmuller.controller('SiteMgmtHomeScreen',function($scope,$http,siteMgmtHomeScreenService,$modal,$rootScope){
	console.log("SiteMgmtHomeScreen");

    // Initialize Carousel Image
    $scope.carouselImage = {
    		title:"",
    		desc:"",
    		imagePath:"",
    		entityID:"",
    		isImageUpdated:false
    };

    // get the list of carousels from the siteMgmtHomeScreenService
    var carousels = siteMgmtHomeScreenService.getCarouselList();
    carousels.then(function(data){
        console.log("No of carousel images returned - " + data.length);
        console.dir(data);
        $rootScope.carouselList = data;
    });


    // carouselGridOptions
    $scope.carouselGridOptions={
    		data:'carouselList',
    		rowHeight:80,
    		columnDefs: [
    	 			  {field:'title', displayName:'Title'},
    	 			  {field:'desc', displayName:'Description'},
    	 			  {field:'imageName', displayName:'Image',
    	 			  cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><img height = "75" width="75" src="./{{row.getProperty(\'imagePath\')}}" /></div>'},
    	 			  {field:'edit', displayName:'Edit',
    	 			  cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="#"><i class="fa fa-pencil fa-fw" ng-click="onEdit(row)"></i></a></div>'},
    	 			  {field:'delete', displayName:'Delete',
    	 			  cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="#"><i class="fa fa-trash-o fa-fw" ng-click="onDelete(row)"></i></a></div>'}
    	 			 ],
    	 	multiSelect: false,
    	 	enableRowSelection:false,
    	 	selectedItems: []
    };

    // on Carousel Image Save button click
    $scope.onSave = function(){
        console.log("SiteMgmtHomeScreen#onSave");
        var carouselImageForm = new FormData();
        carouselImageForm.append('file', $scope.caouselImageFile);
        carouselImageForm.append('imagePath',$scope.carouselImage.imagePath);
        carouselImageForm.append('title',$scope.carouselImage.title);
        carouselImageForm.append('desc',$scope.carouselImage.desc);
        $http.post('/rest/api/home/addCarousel', carouselImageForm, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(carousels){
            console.log('SiteMgmtHomeScreen#onSave#Success');
            console.dir(carousels);
            $rootScope.carouselList = carousels;
        })
        .error(function(carousels){
            console.log('SiteMgmtHomeScreen#onSave#Error');
            console.dir(carousels);
            $rootScope.carouselList = carousels;
        });
    };

    // on Image Upload
    $scope.uploadCarouselImage = function(uploadedImage){
        console.log("SiteMgmtHomeScreen#uploadCarouselImage");
        if (uploadedImage.files && uploadedImage.files[0]) {
            $scope.caouselImageFile = uploadedImage.files[0];
            var fileName = uploadedImage.files[0].name;
            var fileSize = uploadedImage.files[0].size;
            console.log("SiteMgmtHomeScreen#uploadCarouselImage.Name - " + fileName + " Size - " + fileSize);
            $scope.carouselImage.imagePath = fileName;
            $scope.carouselImage.isImageUpdated = true;
            console.dir($scope.carouselImage);
        }
    };

    var deleteCarousel = function(carouselID) {
        var promise = $http.delete('/rest/api/home/deleteCarousel/'+carouselID).then(function(response){
            console.log("/rest/api/home/deleteCarousel/");
            return response.data;
        });
        return promise;
    };

    // On Grid Item Delete
    $scope.onDelete = function(selectedRow){
        console.log("SiteMgmtHomeScreen#onDelete");
        var carouselID = selectedRow.entity._id;
        var updatedCarousels = siteMgmtHomeScreenService.deleteCarousel(carouselID);
        updatedCarousels.then(function(data){
            console.log("No of carousel images returned - " + data.length);
            console.dir(data);
            $rootScope.carouselList = data;
        });
    };


    // On Grid Item Update
    updateCarousel = function(carouselImage,carouselImageFile){
        console.log("SiteMgmtHomeScreen#updateCarousel");
        var carouselImageForm = new FormData();
        if(carouselImage.isImageUpdated) {
            console.log("updateCarousel image uploaded...");
            carouselImageForm.append('file', carouselImageFile);
        }
        carouselImageForm.append('imagePath',carouselImage.imagePath);
        carouselImageForm.append('title',carouselImage.title);
        carouselImageForm.append('desc',carouselImage.desc);
        carouselImageForm.append('entityID',carouselImage.entityID);
        carouselImageForm.append('isImageUpdated',carouselImage.isImageUpdated);
        $http.post('/rest/api/home/updateCarousel/'+carouselImage.entityID, carouselImageForm, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(carousels){
            console.log('SiteMgmtHomeScreen#onUpdate#Success Carousels Returned - ' + carousels.length);
            console.dir(carousels);
            $scope.carouselList = [];
            $rootScope.carouselList = carousels;
        })
        .error(function(carousels){
            console.log('SiteMgmtHomeScreen#onUpdate#Error');
            console.dir(carousels);
            $rootScope.updatedCarouselList = carousels;
        });
    };

    // On Grid Item Edit
    $scope.onEdit = function(selectedRow){
        console.log("SiteMgmtHomeScreen#onEdit");
        //console.dir(selectedRow);
        console.log("SiteMgmtHomeScreen#onEdit ID - " + selectedRow.entity._id);
        $scope.carouselImage.entityID = selectedRow.entity._id;
        $scope.carouselImage.isImageUpdated = false;

        //console.log("Title - " +selectedRow.entity.title + " Desc - " + selectedRow.entity.desc + " Image Path -  " + selectedRow.entity.imagePath);

        $scope.carouselImage.title = selectedRow.entity.title;
        $scope.carouselImage.desc = selectedRow.entity.desc;
        $scope.carouselImage.imagePath = selectedRow.entity.imagePath;

        // Open Modal Window
        var modalInstance = $modal.open({
            templateUrl: 'views/admin/site_mgmt_home_screen_edit_carousel.html',
            controller: editCarouselModalController,
            resolve:{
                carouselImage: function(){
                    console.log("resolve");
                    console.dir($scope.carouselImage);
                    return $scope.carouselImage;
                }
            },
            size: 'lg'
        });

        modalInstance.result.then(function (carouselImage) {
            //console.log("Title - " +carouselImage.title + " Desc - " + carouselImage.desc + " Image Path -  " + carouselImage.imagePath + " File Size - " + $rootScope.updatedCaouselImageFile.size);
            // if the uploaded image has been changed , then add the new image to file, else ignore
            updateCarousel(carouselImage,$rootScope.updatedCaouselImageFile);
            }, function () {
                console.log("Closing Edit Carousel Modal");
        });
    };



});


// Define Controller for Edit Carousel Window

var editCarouselModalController = function($scope,$modalInstance,carouselImage,$rootScope){
    console.log("sm_home_screen_controller#editCarouselModalController");
    console.log("Title - " +carouselImage.title + " Desc - " + carouselImage.desc + " Image Path -  " + carouselImage.imagePath);

    $scope.updatedCarouselImage = {
        title:carouselImage.title,
        desc:carouselImage.desc,
        imagePath:carouselImage.imagePath,
        isImageUpdated:false,
        entityID:carouselImage.entityID
    };

    // on Image Upload
    $scope.uploadCarouselImageEdit = function(uploadedImage){
        console.log("sm_home_screen_controller#uploadCarouselImageEdit");
        $scope.updatedCarouselImage.isImageUpdated = true;
        $scope.updatedCarouselImage.imagePath =  uploadedImage.files[0].name;
        $rootScope.updatedCaouselImageFile = uploadedImage.files[0];
    };

    // Close the modal window
    $scope.onCancel = function () {
        console.log("sm_home_screen_controller#cancel");
        $modalInstance.dismiss('cancel');
    };

    $scope.onModalUpdate = function() {
        console.log("sm_home_screen_controller#update");
        $modalInstance.close($scope.updatedCarouselImage);
    };

};