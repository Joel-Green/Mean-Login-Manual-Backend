var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


// test function to test jwt formation
// generateJwt = function(){
//    var expiry = new Date();
//   expiry.setDate(expiry.getDate() + 7);
//   return jwt.sign({
//     name: "Bhasker",
//     email:'bpandey9876@gmail.com',
//     exp: parseInt(expiry.getTime() / 1000),
//   }, "MY_SECRET");
// }

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    "token":generateJwt()
  })
});

module.exports = router;
