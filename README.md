# README

## Weather Card 1.0

#### Overview:

A simple and attractive weather app powered by the Dark Sky API.

#### Use:

- Clone repository
- NPM install
- Webpack
- Start app

``` sh
$ git clone https://github.com/hochbrian/weather-card.git
cd weather-card/
npm install
npm start
```

#### Notes:

You will need to update the IP address in line 33 of `src/App.js` with your server's IP, otherwise the socket won't be able to connect.

You'll also need to get your own API key from [Dark Sky](https://darksky.net/poweredby/) and enter it as well as your gps in a filed called api-props.js in the root of the project. Here's an example of the contents.

``` Javascript
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.key = 'YOUR_API_KEY_HERE/'; // Be sure to include the trailing '/'
exports.gps = '40.771516,-73.973188'; // Central Park
```
