maxmuller.factory('contentService', function($http) {
    console.log("contentService");
    return {
        getSectionList: function(){
            console.log("getSectionList");
            var promise = $http.get('/rest/api/content/sections').then(function(response){
                console.log("/rest/api/content/sections");
            	return response.data;
            });
            return promise;
        },
        getContentList: function(sectionID){
            console.log("getContentList = " + sectionID);
            var promise = $http.get('/rest/api/content/contents/'+sectionID).then(function(response){
                console.log("/rest/api/content/contents/");
                return response.data;
            });
            return promise;
        },
        getSortedContentList: function(sectionID){
            console.log("getSortedContentList = "  + sectionID);
            var promise = $http.get('/rest/api/content/sortedContents/'+sectionID).then(function(response){
                console.log("/rest/api/content/sortedContents");
                return response.data;
            });
            return promise;
        },
        getContentDetails: function(contentID){
            console.log("getContentDetails = " + contentID);
            var promise = $http.get('/rest/api/content/contentDetails/'+contentID).then(function(response){
                console.log("/rest/api/content/contentDetails/");
                return response.data;
            });
            return promise;
        },
        deleteContent: function(contentID){
            console.log("deleteContent = " + contentID);
             var promise = $http.delete('/rest/api/content/delete/'+contentID).then(function(response){
                console.log("/rest/api/content/delete/");
                return response.data;
             });
             return promise;
        },
        saveContent:function(contentJSON) {
            var contentList = [];
            console.log("saveContent = " + contentJSON.sectionID);
            console.dir(contentJSON);
            $http({
                method: 'POST',
                url: '/rest/api/content/save',
                data: contentJSON
            })
            .success(function(contents){
                console.log("successfully saved content");
                contentList = contents;
            })
            .error(function(error){
                console.log("error while saving content.Error Details : " + error);
            });
            return contentList;
        },
        updateContent:function(contentID,contentJSON){
            var contentList = [];
            console.log("saveContent = " + contentJSON.section_id);
            console.dir(contentJSON);
            $http({
                method: 'POST',
                url: '/rest/api/content/update/'+contentID,
                data: contentJSON
            })
            .success(function(contents){
                console.log("successfully saved content");
                contentList = contents;
            })
            .error(function(error){
                console.log("error while saving content.Error Details : " + error);
            });
            return contentList;                                
        }
    };
});