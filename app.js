
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var routes = require('./app/routes');
var user = require('./app/routes/user');
var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;
var mongoClient = new MongoClient(new Server('localhost', 27017));


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/spend', routes.spend);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
