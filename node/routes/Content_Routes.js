var path = require('path');
var fs = require('fs');
var mongoDBConnURI = "mongodb://maxmulleradmin:maxmulleradmin@localhost:27017/maxmuller";

module.exports = function(app,currentDir){
    var contentDAOPath = path.join(currentDir,'node','dao','ContentDAO.js');
    console.log("Content_Routes.js#Content DAO Path - " + contentDAOPath);
    var contentDAO = require(contentDAOPath);
    // set the DB connection URI
    contentDAO.setDBConnection(mongoDBConnURI);

    // Get Section List
    // /rest/api/content/sections
    app.get('/rest/api/content/sections',function(request,response){
        console.log("Content_Routes#/rest/api/content/sections");
        contentDAO.getSections(function(sectionList){
            console.log("The no of sections retrieved from DB - " + sectionList.length);
            response.json(sectionList);
        },function(error){
            console.log("Content_Routes#/rest/api/content/sections Error:" + error);
            response.json([]);
        });
    });


    // Get Content List
    // /rest/api/content/contents/:sectionID
    app.get('/rest/api/content/contents/:sectionID?',function(request,response){
        console.log("Content_Routes#/rest/api/content/contents/:sectionID");
        var sectionID = request.params.sectionID;
        contentDAO.getContentList(sectionID,function(contentList){
            console.log("The no of contents retrieved from DB - " + contentList.length);
            response.json(contentList);
        },function(error){
            console.log("Content_Routes#/rest/api/content/sections Error:" + error);
            response.json([]);
        });
    });

    // Get Sorted Content List
    // /rest/api/content/sortedContents/:sectionID
    app.get('/rest/api/content/sortedContents/:sectionID?',function(request,response){
        console.log("Content_Routes#/rest/api/content/sortedContents/:sectionID");
        var sectionID = request.params.sectionID;
        contentDAO.getSortedContentList(sectionID,function(contentList){
            console.log("The no of sortedContents retrieved from DB - " + contentList.length);
            response.json(contentList);
        },function(error){
            console.log("Content_Routes#/rest/api/content/sections Error:" + error);
            response.json([]);
        });
    });    


    // Get Content Details
    // /rest/api/content/contentDetails/:contentID
    app.get('/rest/api/content/contentDetails/:contentID?',function(request,response){
        console.log("Content_Routes#/rest/api/content/contentDetails/:contentID");
        var sectionID = request.params.contentID;
        contentDAO.getContentDetails(contentID,function(contentList){
            console.log("The no of contents retrieved from DB - " + contentList.length);
            response.json(contentList);
        },function(error){
            console.log("Content_Routes#/rest/api/content/contentDetails/ Error:" + error);
            response.json([]);
        });
    });

    // Save Content
    app.post('/rest/api/content/save',function(request,response){
        console.log("Content_Routes#/rest/api/content/save");

        // Save the Content
        var contentJSON = request.body;
        console.dir(contentJSON);
        // Save
        var sectionID = contentJSON.sectionID;

        var newContent = {
            section_id:sectionID,
            content_html:contentJSON.contentText,
            createdDate:new Date(),
            updatedDate:new Date()
        };
        contentDAO.saveContent(newContent,function(content){
            console.log("Saved Content " + content);
            // Get the list of Cotnents
           contentDAO.getContentList(sectionID,function(contentList){
               console.log("The no of contents retrieved from DB - " + contentList.length);
               response.json(contentList);
           },function(error){
               console.log("Content_Routes#/rest/api/content/sections Error:" + error);
               response.json([]);
           });
        },function(error){
            console.log("Home_Routes#/rest/api/home/addCarousel " + error);
        })
    });


    // Update Content
    app.post('/rest/api/content/update/:contentID?',function(request,response){
        console.log("Content_Routes#/rest/api/content/update");
        // Update the Content
        var contentJSON = request.body;
        var contentID = request.params.contentID;
        var sectionID = contentJSON.section_id;
        //console.dir(contentJSON);
        // Update
        contentDAO.updateContent(contentID,contentJSON,function(content){
            console.log("Updated Content " + content);
            // Get the list of Cotnents
           contentDAO.getContentList(sectionID,function(contentList){
               console.log("The no of contents retrieved from DB - " + contentList.length);
               response.json(contentList);
           },function(error){
               console.log("Content_Routes#/rest/api/content/sections Error:" + error);
               response.json([]);
           });
        },function(error){
            console.log("Home_Routes#/rest/api/home/addCarousel " + error);
        })
    });

    // Delete Content
    // /rest/api/content/delete/:contentID
    // delete the HomeCarousel document
    app.delete('/rest/api/content/delete/:contentID?',function(request,response){
        var contentID = request.params.contentID;
        console.log("Content_Routes#/rest/api/content/delete/ Content ID = " + contentID);
        // Delete
        contentDAO.deleteContent(contentID,function(){
            response.json({
                status:'SUCCESS'
            });
        },function(error){
            console.log("Home_Routes#/rest/api/home/deleteCarousel " + error);
            response.json({
                status:'FAILURE'
            });
        });
    });


};