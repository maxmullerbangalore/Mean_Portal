maxmuller.factory('galleryService', function($http,$q) {
    console.log("galleryService");
    return {
        getAlbumList: function(){
            console.log("getAlbumList");
            var promise = $http.get('/rest/api/gallery/albums').then(function(response){
                console.log("/rest/api/gallery/albums");
            	return response.data;
            });
            return promise;
        },
        getAlbum:function(albumID){
            console.log("getAlbum Album ID - " + albumID);
            var promise = $http.get('/rest/api/gallery/album/'+albumID).then(function(response){
                console.log("/rest/api/gallery/album/");
                return response.data;
            });
            return promise;
        },
        deleteAlbum:function(albumID){
            console.log("deleteAlbum");
            var promise = $http.delete('/rest/api/gallery/deleteAlbum/'+albumID).then(function(response){
                console.log("/rest/api/gallery/deleteAlbum/");
                return response.data;
            });
            return promise;
        },
        getAlbumImageList: function(){
            console.log("getAlbumImageList");
            var promise = $http.get('/rest/api/gallery/albumImages').then(function(response){
                console.log("//rest/api/gallery/albumImages");
                return response.data;
            });
            return promise;
        }
    };
});