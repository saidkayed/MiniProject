var express = require('express');
var router = express.Router();
var userFacade = require('../facades/UserFacade');
var Pos = require("../models/Position");
var sletmig = "hej";
var sletmig2;

/* GET users listing. */
router.get('/all', function(req, res, next) {
  userFacade.getAllUser().then(data =>{
    res.json(data)
  })
});

router.post('/add',(req,res) =>{
  
  var firstname = req.body.firstName;
  var lastname = req.body.lastName;
  var username = req.body.userName;
  var password = req.body.password;
  var email = req.body.email;

  userFacade.addUsers(firstname,lastname,username,password,email).then(data =>{
res.json(data)

  }).catch(err =>{
    if(err.name == "MongoError" && err.code == 11000){
      
      return res.status(405).send({ succes: false, message: 'User already exist!' });
    }
        return res.status(500).send(err);
  });
})

router.post('/login', async  (req,res) =>{
  var username = req.query.username;
  var password = req.body.password;
  var longitude = req.body.longitude;
  var latitude = req.body.latitude;
  var distance = req.body.distance;
  var hash = "Hash Please and add some salt"





  
  var  user = await userFacade.getUserByName(username).then(data =>{
    
  sletmig2 = data;

}).catch(err =>{
  //console.log(err);
})

if(sletmig2.length === 0){
  return  res.status(405).send({ succes: false, message: 'User does not exist' })
  }
  if(sletmig2[0].password === hash+password){
    var userPos = await Pos.find({user: sletmig2[0]._id});
  
  if(userPos[0] == null){
    var position = new Pos({
      user:sletmig2[0]._id,
      
      loc: {
      coordinates: [longitude,latitude]
     }
     })
     position.save();
  }else{
 
   var updates = await Pos.findOneAndUpdate({user:[sletmig2[0]._id]},{created:Date.now(),loc: {type:'Point', coordinates: [longitude,latitude]}},{setDefaultsOnUpdate: true,new:true,upsert:true}).exec();
   console.log(updates);

   //    var blog = await LocationBlog.findOneAndUpdate({_id : [blogid]}, { $push: {likedBy: userid} }, {new: true})
  }
  
    
//return res.send(sletmig2);
  }else{
   return res.status(403).send({ succes: false, message: 'Wrong Password' })
  }

})

module.exports = router;
