var path = require('path');
var webpack = require('webpack');
var express = require('express');
var moment = require('moment');
var config = require('./webpack.config');
var api = require('./api');

var app = express();
var compiler = webpack(config);

var weatherReport = {}


app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(express.static(path.resolve('./public')))

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

var server = app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  // Set up socket
  var io = require('socket.io').listen(server);

  var connections = []
  // Configure sockets
  io.sockets.on('connection', function(socket) {

    // Handle disconnects
    socket.once('disconnect', function() {
      connections.splice(connections.indexOf(socket), 1);
      socket.disconnect();
      io.sockets.emit('clientDisconnect', { connections: connections.length });
      console.log('Disconnected: %s sockets remaining.', connections.length);
    });

    socket.on('weather-request', function(payload) {
      console.log('weather requested');
      socket.emit('weather-report', weatherReport)
    });

    // Add socket to connections array
    connections.push(socket);
    io.sockets.emit('joined', { connections: connections.length });
    console.log('There are %s connections.', connections.length);
  });

  // Push weather update
  function updateWeather(){
    var d = moment().format('LTS');
    api.wthr().then(function(response){
      console.log(d, 'Weather JSON received');
      io.sockets.emit('weather-report', response);
      weatherReport = response;
    }, function(err){
      console.log(err);
    });
  };

  updateWeather();
  setInterval(updateWeather, 90000);


  console.log('Listening at http://localhost:3000/');
});
