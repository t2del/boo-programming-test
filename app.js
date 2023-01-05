'use strict';


// Requiring module
const express = require('express');
var session = require('express-session');
const cookieParser = require('cookie-parser');


// Creating express object
const app = express();
const port =  process.env.PORT || 3000;



// set the view engine to ejs
app.set('view engine', 'ejs');

// Function to serve all static files
// inside public directory.
app.use(express.static('public')); 
app.use('/images', express.static('public/photos'));


// Set up the session middleware
app.use(session({
    secret: 'keyboard cat',  // used to sign the session ID cookie, should be a random string
    resave: false,  // don't save session if unmodified
    saveUninitialized: false  // don't create session until something stored
}))
app.use(cookieParser());
  
// let static middleware do its job
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());
var ctr = 1;
app.post('/',function(req,res){
   
    var username = req.body.username;
    var htmlData = 'Hello:' + username;
    res.send(htmlData); 
    req.session.data = req.body;
    var formData = { "id": ctr, "name" : req.body.username,"comment" : req.body.comments };
    
    // set a cookie
    app.use(function (req, res, next) {
        // check if client sent cookie
        var cookie = req.cookies.cookieName;
        if (cookie === undefined) {
        // no: set a new cookie
        
        res.cookie('cookieComments',formData, { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
        } else {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);
        } 
        next(); // <-- important!
    });
    ctr++;
    // console.log('formdata: ', formData);
    console.log('sessData: ', req.session.data);

    console.log('cookiesData: ', req.cookies);
});


// routes
app.use('/', require('./routes/profile')());

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);