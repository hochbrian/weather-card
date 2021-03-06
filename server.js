var path = require('path');
var webpack = require('webpack');
var express = require('express');
var moment = require('moment');
var config = require('./webpack.config');
var api = require('./api');

var app = express();
var compiler = webpack(config);

var weatherReport = {}
var airReport = {}


// Using Dan Abramov's react-hot-loader with webpack-hot-middleware etc because
// I like the error handling/warnings it has.
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

    socket.on('data-request', function(payload) {
      socket.emit('weather-report', weatherReport)
      socket.emit('air-report', airReport)
    });

    // Add socket to connections array
    connections.push(socket);
    io.sockets.emit('joined', { connections: connections.length });
    console.log('There are %s connections.', connections.length);
  });

  // Push weather update
  function updateWeather(){
    // log timestamp of each api call for reference
    var d = moment().format('LTS');
    api.wthr().then(function(response){
      console.log(d, 'Weather JSON received');
      io.sockets.emit('weather-report', response);
      weatherReport = response;
      // When API returns new weather data broadcast it on all connected sockets
      // and save data to weatherReport to be able to serve it up for new
      // connections or for page refreshes without having to make a new API call
    }, function(err){
      console.log(err);
    });
  };

  function updateAqi(){
    // log timestamp of each api call for reference
    var d = moment().format('LTS');
    api.aqi().then(function(response){
      console.log(d, 'Air JSON received');
      io.sockets.emit('air-report', response);
      airReport = response;
    }, function(err){
      console.log(err);
    });
  };

  // get weather at app start and then every 90 seconds. 90 second interval will
  // result in 40 api calls per hour and 960 over a 24 hour period. This stays
  // under the 1000/day free limit on the Dark Sky API.
  updateWeather();
  setInterval(updateWeather, 90000);

  updateAqi();
  setInterval(updateAqi, 300000);


  console.log('Listening at http://localhost:3000/');
});
