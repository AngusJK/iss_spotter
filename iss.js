const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body)['ip'];
    request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching geocoordinates. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      let coords = {};
      const lat = JSON.parse(body)['lat'];
      const lon = JSON.parse(body)['lon'];
      coords.latitude = lat;
      coords.longitude = lon;
      request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
        if (error) {
          callback(error, null);
          return;
        }
        if (response.statusCode !== 200) {
          const msg = `Status Code ${response.statusCode} when fetching ISS flyover times. Response: ${body}`;
          callback(Error(msg), null);
          return;
        }
        const passes = JSON.parse(body)['response'];
        callback(null, passes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };