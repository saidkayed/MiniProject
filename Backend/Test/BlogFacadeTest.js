
const expect = require('chai').expect;

const dbConnect = require("../dbConnect");
dbConnect(require('../settings.js').TEST_DB_URI);

const Blogs = require('../models/LocationBlog.js');
const User = require('../models/User.js');
const blogFacade = require('../facades/blogFacade.js');

describe("Testing the BlogFacade", function () {

    var log;

    before(async function () {
        await Blogs.deleteMany({});
        //done()
    });

    //select({ _id: 1 }).exec()
    it("Creating Log", async function () {


        var user = await User.find({ firstName: "Find" }).select({ _id: 1 }).exec()
            .then((data) => {
                if (data != []) {
                    console.log("What is in data " + data[0]);
                    return data[0]

                } else {
                    throw Error("User you where looking for is in another castle")
                }

            })
            .catch((err) => err);
        console.log("What is in user:" + user);
        var log = await blogFacade.addLocationBlog
            (
                "This is a blog about a place",
                { longitude: 50, latitude: 13 },
                user
            )
            .catch((err) => { throw err });
        expect(log.author).to.be.equal(user);
    })

    it("Liking log", async function () {
        var user = await User.find({ firstName: "Find" }).select({ _id: 1 }).exec()
            .then((data) => {
                if (data != []) {
                    console.log("What is in data " + data[0]);
                    return data[0]

                } else {
                    throw Error("User you where looking for is in another castle")
                }

            })
            .catch((err) => err);
        console.log("What is in user:" + user);
        var blogid = await Blogs.find({ info: "This is a blog about a place" }).select({ _id: 1 }).exec()
            .then((data) => {
                if (data != []) {
                    console.log("What is in data " + data[0]);
                    return data[0]

                } else {
                    throw Error("log you where looking for is in another castle")
                }

            })
                .catch((err) => err);
        console.log("What is in log:" + blogid);
        await blogFacade.likeLocationBlog(blogid, user);
        var blog = await Blogs.find({info : "This is a blog about a place"})
        expect(blog[0].likedBy.toString()).to.be.equal(user._id.toString())
    })
})




