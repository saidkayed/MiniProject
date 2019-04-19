const LocationBlog = require("../models/LocationBlog.js");

async function addLocationBlog(info, pos ,author) {

    var location = new LocationBlog
    ({
        info, 
        pos, 
        author
    });
    
    await location.save(location);
    return location;
    //await location.create();
}


async function likeLocationBlog(blogid, userid){
    var blog = await LocationBlog.findOneAndUpdate({_id : [blogid]}, { $push: {likedBy: userid} }, {new: true}).exec();
    return blog;
  }
module.exports = 
{
    addLocationBlog,
    likeLocationBlog
}