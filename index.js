const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

let IPv4 = "";
let coords = {};

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  IPv4 = ip;
  console.log('It worked! Returned IP:' , ip);
  fetchCoordsByIP(IPv4, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    coords = data;
    console.log('Returned geocoordinates:' , data);
    fetchISSFlyOverTimes(coords, (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('Next five ISS flyovers:' , data);
    });
  });
});



