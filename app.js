/**
 * Module dependencies.
 */

var flash = require('connect-flash');
var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(express)

var conf = {
  db: {
    db: process.env.MONGODB,
    host: process.env.MONGOHOST,
    port: process.env.MONGOPORT,  // optional, default: 27017
    username: process.env.MONGOUSER, // optional
    password: process.env.MONGOPASS, // optional
    collection: 'mySessions' // optional, default: sessions
  }
};


require('./app/config/passport')(passport); 

var routes = require('./app/routes');
var user = require('./app/routes/user');
var spend = require('./app/routes/spend');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.static(path.join(__dirname, 'public')));

// passport
app.use(express.session({
    secret: 'dewit',
    store: new MongoStore(conf.db),
    cookie: {
        maxAge: 31*24*60*60*1000 // 31 days, in milliseconds
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', user.isLoggedIn, spend.index);
app.get('/spend', user.isLoggedIn, spend.index);
app.get('/expense/:amount/:dateString?*', spend.expense);
app.get('/retrieve/:dateString?*', spend.retrieve);
app.get('/roadmap', spend.roadmap);

// user routes
app.get('/login', user.login);
app.get('/login-fail', user.loginFail);
app.get('/signup', user.signup);
app.get('/signup-fail', user.signupFail);
app.get('/logout', user.logout);
app.get('/profile', user.isLoggedIn, user.profile);

mongoose.connect(process.env.MONGOHQ_URL);

app.post('/login', 
    passport.authenticate('local-login',
    {
        successRedirect: '/spend',
        failureRedirect: '/login-fail',
    }),
    function (req, res) {
        
        
    }
);

app.post('/signup', 
    passport.authenticate('local-signup', 
    {
        successRedirect: '/',
        failureRedirect: '/signup-fail',
        failureFlash: true
    }),
    function (req, res) {
        console.log(req);
        console.log(res);    
});

app.post('/profile', user.updateProfile);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
