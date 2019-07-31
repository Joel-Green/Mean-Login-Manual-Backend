var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/add',(req,res)=>{
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phoneno = req.body.phoneno;
  if(name&&email&&password&&phoneno)
  {

    new User({
      name,
      email,
      password,
      phoneno
    }).save((err,data)=>{
      if(err)
      {
        console.log(err);
        res.json({"message":err})
      }
      else
      {
        res.json(data);
      }
    })
  }
  else {
    res.json({"message":"Please Fill All fields"})
  }
})

router.post('/login',(req,res)=>{
  let UserObj = {
    email : req.body.email,
    password : req.body.password
  }
  User.findOne({
    email:UserObj.email
  },
  (err,data)=>{
    if(err)
    {
      res.json({"message":err})
    }
    else {
      if(user=null)
      {
        res.json({"message":"Check Your Credentials"})
      }
      else if(!data.password==UserObj.password)
      {
        res.json({"message":"Check your Credentials"})
      }
      else{
        data['token']=data.generateJwt();
        console.log(data.token);
        // console.log(data)
        // res.json(data);
        let responseObj = {
          name:data.name,
          email:data.email,
          phoneno:data.phoneno,
          token:data.token
        };
        console.log(responseObj);
        res.json(responseObj)
      }
    }

  })

  console.log(UserObj);
})

module.exports = router;
