var express = require('express');
var path = require('path');
var app = express();
var routes = require('./route')(app);

app.use(express.static('static'));
//app.use('/utils', express.static('utils'));
//app.use('/styles', express.static('styles'));
var server = app.listen(process.env.PORT||3000);

server.on('connection', function(socket) {
  console.log("A new connection was made by a client.");
  socket.setTimeout(30 * 1000); 
  // 30 second timeout. Change this as you see fit.
})
