
const expect = require('chai').expect;
//const mongoose = require('mongoose');

const dbConnect = require("../dbConnect");
dbConnect(require('../settings.js').TEST_DB_URI);

const User = require('../models/User.js');
const userFacade = require('../facades/UserFacade.js');

describe("Test of UserFacde Basic API", function () {

    before(async function () {


        await User.deleteMany({});
        await userFacade.addUsers("Find", "Me", "MeBeFound", "1234", "find@me.dk");
        await userFacade.addUsers("Afirst", "Alast", "Auser", "Apass", "T@A.dk");
        await userFacade.addUsers("Bfirst", "Blast", "Buser", "Bpass", "B@B.dk");
        
        
    });


    it("AddUser to DB", async function () {
        await userFacade.addUsers("Cfirst", "Clast", "Cuser", "Cpass", "C@C.dk");
        var user = await User.find({ "firstName": "Find" });
        expect(user[0].firstName).to.be.equal("Find");
    })

    it("Get all Users", async function(){
        var users = await userFacade.getAllUser();
        expect(users.length).to.be.equal(4);

    })

    it("get User by userName", async function(){
        var user = await userFacade.getUserByName("MeBeFound");
        expect(user[0].firstName).to.be.equal("Find");
    })

    after(function () {
    })

});
