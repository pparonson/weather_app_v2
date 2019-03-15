const axios = require('axios')

const APPID = '94b64a6167479ba6904363088af58651' // my appId

function weatherUrl(city) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    city,
  )}&units=imperial&APPID=${APPID}`;
}

// return the request url
const url = weatherUrl('Paris');

// // axios requires the url as a prop of a request obj
// const request = { url };
//
// // axios returns a promise obj
// const promise = axios(request);
//
// promise.then(success, error);
//
// function success(response) {
//   console.log(JSON.stringify(response.data, null, 2));
// }
//
// function error(err) {
//   console.log(JSON.stringify(err.response.data, null, 2));
// }

axios.get(url)
    .then(function (response) {
        // handle success
        console.log(`response: ${JSON.stringify(response.data, null, 2)}`)
    })
    .catch(function (error) {
        // handle error
        console.log(error)
    })
    .then(function () {
      console.log(`success again for url: ${url}`)
    })
