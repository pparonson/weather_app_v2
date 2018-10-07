const axios = require("axios")

const APP_ID = "94b64a6167479ba6904363088af58651"
const OPEN_WEATHER_MAP_URL = "http://api.openweathermap.org/data/2.5/weather?units=imperial"

// api call: api.openweathermap.org/data/2.5/weather?q={city name}

function weatherUrl(location) {
  const encodedLocation = encodeURIComponent(location)
  return `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}&appid=${APP_ID}`
}

const _url  = weatherUrl("Paris")

// axios requires url as a property of a request obj (ie url: '/user')
const request = {url: _url}

// returns a promise
const promise = axios(request)

promise.then(res => {
  // console.log( JSON.stringify(res.data, null, 2) )
  return res.data
}, err => {
  throw new Error(err.response.data.message)
})
