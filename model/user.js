const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

let user = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phoneno: {
        type: String
    },
},
);

user.methods.generateJwt = function()
{
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        phoneno : this.phoneno,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
}


module.exports = mongoose.model('User', user); 