const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const upload = require('express-fileupload');
const serverless = require('serverless-http');
const app = express()

// import Database
require('./config/db');

// import Cloudinary
require('./config/cloudinary');

// import User Model
require('./Model/User');

// import Passport-setup-Stratgies
require('./config/passport-setup');

//Import verify Authentication middleware
const auth = require('./middleware-Authentication');

app.use(function(req, res, next) {
  let allowedOrigins = ['*']; // list of url-s
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');
  next();
});

app.use(passport.initialize());
app.use(upload({useTempFiles:true}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/'));
app.use(function(err, req, res, next) {
  res.status(500).send('There is some error in you Input !!');
});

app.use('/local',require('./routes/local-signup-login'));

app.use('/google',require('./routes/google-signup-login'));

app.use('/auth',require('./routes/private-routes'));

app.get('/test',(req,res)=>{
  res.status(200).send({
    message:"I am successfully calling"
  })
})

module.exports.handler = serverless(app);