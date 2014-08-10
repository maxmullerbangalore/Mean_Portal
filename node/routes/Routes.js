var path = require('path');

module.exports = function(app,currentDir) {

    // Home_Routes.js
    var homeRoutes = require('./Home_Routes.js')(app,currentDir);

    // Gallery_Routes.js
    var homeRoutes = require('./Gallery_Routes.js')(app,currentDir);

    // Content_Routes.js
    var contentRoutes = require('./Content_Routes.js')(app,currentDir);

    // User_Routes.js
    var contentRoutes = require('./User_Routes.js')(app,currentDir);

    // Default Path
    app.get('/',function(request,response){
        console.log('Routes.js#/');
    	var indexHTML = path.join(currentDir,'ui','index.html');
    	console.log('Routes.js index html path = ' + indexHTML);
    	response.sendFile(indexHTML);
    });

};