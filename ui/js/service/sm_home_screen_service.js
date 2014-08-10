maxmuller.factory('siteMgmtHomeScreenService', function($http) {
    console.log("siteMgmtHomeScreenService");
    return {
        getCarouselList: function(){
            console.log("getCarouselList");
            var promise = $http.get('/rest/api/home/carousels').then(function(response){
                console.log("/rest/api/home/carousels");
            	return response.data;
            });
            return promise;
        },
        getCarousel:function(carouselID){
            console.log("getCarousel");
        },
        deleteCarousel:function(carouselID){
            console.log("deleteCarousel ID = " + carouselID);
            var promise = $http.delete('/rest/api/home/deleteCarousel/'+carouselID).then(function(response){
                console.log("/rest/api/home/deleteCarousel/");
                return response.data;
            });
            return promise;
        }
    };
});