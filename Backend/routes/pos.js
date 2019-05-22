var express = require('express');
var router = express.Router();
var Pos = require("../models/Position");


router.get("/pos",async function(res,req){
await Pos.find({}).then(doc =>{
    res.json(doc);
});
})