var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var UserSchema = new Schema({
    firstName : String,
    lastName : String,
    userName : {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    created : {type: Date, default: Date.now},
    
    lastUpdated : Date
})

UserSchema.pre("save", function(next) {
    this.password = "Hash Please and add some salt" + this.password;
    next(); //We have to add this otherwise Mongoose wont go beyond this function (basically, add this or it stops here)
})

UserSchema.pre("update", function(Next) {
    this.update({}, {$set: {lastUpdated: new Date()}})
    next();
})

var User = mongoose.model("User", UserSchema);
module.exports = User;