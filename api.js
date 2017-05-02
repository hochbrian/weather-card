Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.wthr = wthr;
exports.aqi = aqi;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = require('./api-props').key;
var gps = require('./api-props').gps;
var aqiKey = require('./api-props').aqiKey;

var slug = 'https://api.darksky.net/forecast/' // [key]/[latitude],[longitude]'

function wthr() {
  return new Promise(function (resolve, reject) {
    _superagent2.default.get(slug + key + gps).set({ Accept: 'application/json' }).end(function (err, response) {
      if (err) {
        console.error(err);
      } else if (typeof(response) !== 'undefined') {
        resolve(response.body);
      }
    });
  });
}

var aqiSlug = 'http://api.airvisual.com/v2/nearest_city?lat='
var gpsArr = gps.split(',')
var lat = gpsArr[0]
var lon = gpsArr[1]

function aqi() {
  return new Promise(function (resolve, reject) {
    _superagent2.default.get(aqiSlug + lat + '&lon=' + lon + '&rad=10&key=' + aqiKey).set({ Accept: 'application/json' }).end(function (err, response) {
      if (err) {
        console.error(err);
      } else if (typeof(response) !== 'undefined') {
        resolve(response.body);
      }
    });
  });
}
