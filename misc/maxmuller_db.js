// CREATE DB

> show dbs
admin     0.078GB
local     0.078GB
schooldb  0.078GB
> db
test
> use maxmuller
switched to db maxmuller
> db
maxmuller
> show collections
> show dbs
admin      0.078GB
local      0.078GB
maxmuller  (empty)
schooldb   0.078GB
>


// CREATE COLLECTION with auto generated id

// ****** HOME CAROUSEL ********** //

> db.createCollection("HomeCarousel",{autoIndexId:true})
{ "ok" : 1 }
> show collections
HomeCarousel
system.indexes


// ****** GALLERY ************* //

> db.createCollection("Gallery",{autoIndexId:true})

// ****** ANNOUNCEMENTS ************* //
> db.createCollection("Announcements",{autoIndexId:true})

// ****** FACILITIES ************* //
> db.createCollection("Facilities",{autoIndexId:true})

// ****** ABOUT US ************* //
> db.createCollection("Management",{autoIndexId:true})

// ****** SCHEDULE ************* //
> db.createCollection("Schedule",{autoIndexId:true})

// ****** USER *****************//
> db.createCollection("User",{autoIndexId:true})

// ****** ALBUM *****************//
> db.createCollection("Album",{autoIndexId:true})

// ****** ALBUM IMAGES *****************//
> db.createCollection("Album_Images",{autoIndexId:true})

// ****** CONTENTS *********************//
> db.createCollection("Contents",{autoIndexId:true})

// CREATE USER
> show dbs
admin      0.078GB
local      0.078GB
maxmuller  0.078GB
schooldb   0.078GB
> use maxmuller
switched to db maxmuller
> db.createUser({user:"maxmulleradmin",pwd:"maxmulleradmin",roles:[{role:"readWrite",db:"maxmuller"}]})
Successfully added user: {
        "user" : "maxmulleradmin",
        "roles" : [
                {
                        "role" : "readWrite",
                        "db" : "maxmuller"
                }
        ]
}
> show users
{
        "_id" : "maxmuller.maxmulleradmin",
        "user" : "maxmulleradmin",
        "db" : "maxmuller",
        "roles" : [
                {
                        "role" : "readWrite",
                        "db" : "maxmuller"
                }
        ]
}
>

// ADD SUPER USER

> use maxmuller
switched to db maxmuller
> db
maxmuller
> show collections
Announcements
Facilities
Gallery
HomeCarousel
Management
Schedule
User
system.indexes
> db.User.insert({createdTime:new Date(),updatedTime:new Date(),userID:"umeshkumar.kumar",login:"google",role:"superadmin"})
WriteResult({ "nInserted" : 1 })
> db.User.find()
{ "_id" : ObjectId("53d353abd086e2ae989bf8b8"), "createdTime" : ISODate("2014-07-26T07:07:23.505Z"), "updatedTime" : ISODate("2014-07-26T07:07:23.505Z"), "userID" : "umeshkumar.kumar", "login" : "google", "role" : "superadmin" }
>