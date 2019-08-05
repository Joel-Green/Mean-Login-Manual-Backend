var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/add', (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phoneno = req.body.phoneno;
  if (name && email && password && phoneno) {

    new User({
      name,
      email,
      password,
      phoneno
    }).save((err, data) => {
      if (err) {
        console.log(err);
        res.json({ "message": err })
      }
      else {
        res.json(data);
      }
    })
  }
  else {
    res.json({ "message": "Please Fill All fields" })
  }
})

router.post('/login', (req, res) => {
  let UserObj = {
    email: req.body.email,
    password: req.body.password
  }
  User.findOne({
    email: UserObj.email
  },
    (err, data) => {
      if (err) {
        res.json({ "message": err })
      }
      else {
        if (data == null) {
          res.json({ "message": "Check Your Credentials" })
        }
        else if (!data.password == UserObj.password) {
          res.json({ "message": "Check your Credentials" })
        }
        else {
          data['token'] = data.generateJwt();
          // console.log(data.token);
          // console.log(data)
          // res.json(data);
          /////this is used to store the jwt stored for authentication
          User.findByIdAndUpdate(data._id,
            { $push: { validJwts: data.token } },
            { safe: true, upsert: true }, (err, data) => {
              if (err)
                console.log(err);
              else {
                console.log(data)
              }
            });

            ///////sending the response back to client ie angular
          let responseObj = {
            name: data.name,
            email: data.email,
            phoneno: data.phoneno,
            token: data.token
          };
          // console.log(responseObj);
          res.json(responseObj)
        }
      }

    })

  console.log(UserObj);
})

router.post('/logout', (req,res)=>{
  // console.log('inside logout route ##########################################3');
  let _id = req.body._id;
  let jwt = req.body.jwt;
  console.log(req.body);
  res.json({"message":"logged out"})
  User.findByIdAndUpdate(_id,
    {$pull: {validJwts : jwt}},
    {safe: true, upsert: true},
    (err,data)=>{
      if(err)
        console.log(err)
      else{
        console.log(data);

      }
    }
    )
})

router.post('/authenticate',(req,res)=>{
  let _id = req.body._id;
  let jwt = req.body.jwt;
  User.findById(_id,(err,user)=>{
    if(err)
    console.log(err)
    else{
      if(user==null)
      {
        console.log("user not found")

      }
      else{
        console.log(user.validJwts)
        res.json({"message":"authenticating"})
        let valid = false;
        user.validJwts.forEach(element)
        {
          if(jwt==element)
          {
            
          }
        }
      }
    }
  })
  
})




module.exports = router;
