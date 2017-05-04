var express = require('express');
var path = require('path');
var app = express();
var routes = require('./route')(app);

app.use(express.static('static'));
//app.use('/utils', express.static('utils'));
//app.use('/styles', express.static('styles'));
app.listen(3000);