const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body)['ip'];
  return request(`http://ip-api.com/json/${ip}`);
};

module.exports = { fetchMyIP,
  fetchCoordsByIP };