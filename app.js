/**
 * Module dependencies.
 */

var flash = require('connect-flash');
var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');


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
app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));

// passport
app.use(express.session({secret: 'dewit'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/spend', user.isLoggedIn, spend.index);
app.get('/expense/:amount/:dateString?*', spend.expense)
app.get('/retrieve/:dateString?*', spend.retrieve);

// user routes
app.get('/login', user.login);
app.get('/signup', user.signup);
app.get('/logout', user.logout);
app.get('/profile', user.isLoggedIn, user.profile);

mongoose.connect('mongodb://localhost/expensesTest');

app.post('/login', 
    passport.authenticate('local-login',
    {
        successRedirect: '/spend',
        failureRedirect: '/login',
    }),
    function (req, res) {
        
        
    }
);

app.post('/signup', 
    passport.authenticate('local-signup', 
    {
        successRedirect: '/',
        failureRedirect: '/signup',
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
