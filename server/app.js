/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});	

// Expose app
exports = module.exports = app;

// Set default node environment to development
/*process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var config = require('./config/environment');


//Load Route
var app = express();
var connection  = require('express-myconnection'); 
var mysql = require('mysql');

app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(    
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'go-dev'
    },'request')
);

// Setup server
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});	

//Expose App
exports = module.exports = app;*/


