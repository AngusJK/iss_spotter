const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    console.log('error', error);
    //console.log('response', response && response.)
    if (!error) {
      callback(null, JSON.parse(body)['ip']);
    } else {
      callback(error, null);
    }
  });
};

module.exports = { fetchMyIP };