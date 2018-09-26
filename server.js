var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var app = express();


// import models
var models = require('./app/models');

models.sequelize.sync().then(()=>{
    console.log("Sincronizado");
}).catch((err)=>{
    console.error(err,"Error en la Sincronizacion");
});


//midleware
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized:true}))
app.use(passport.initialize());
app.use(passport.session());




app.get('/', function (req, res) {
    res.send('online')
})

app.listen('5000', function (err) {
        if(!err)
            console.log('Sitio levantado');
        else console.error(err)
});