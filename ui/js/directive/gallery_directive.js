maxmuller.directive('mmAlbum',function(galleryService){
	console.log('maxmuller#mmAlbum');
	return{
		restrict: 'EA',
		link: function(scope,element,attributes){
			console.log('maxmuller#mmAlbum#');
			// get the album's _id from mm-album-id
			var albumID = attributes.mmAlbumId;
			//var albumName = scope.getAlbumName(albumID);
			var albumPromise = galleryService.getAlbum(albumID);
	        var albumName="";
	        albumPromise.then(function(album){
	            console.log("Album Details returned - " + album.length);
	            console.dir(album[0]);
	            albumName = album[0].name;
	            console.log("albumName = " + albumName);
	            scope.albumName  = albumName;
	        });
		}
    };
});