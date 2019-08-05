
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

let company = new Schema({
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

//method to generate Jwt
company.methods.generateJwt = function()
{
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        phoneno : this.phoneno,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // import secret from config file later
}


module.exports = mongoose.model('Company', company); 