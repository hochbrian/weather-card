'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wthr = wthr;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = require('./api-props').key;
var gps = require('./api-props').gps;

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
