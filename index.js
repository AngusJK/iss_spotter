const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

let IPv4 = "";

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  IPv4 = ip;
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP(IPv4, (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
});

