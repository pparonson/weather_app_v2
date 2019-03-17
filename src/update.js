import * as R from "ramda"

const MSGS = {
  CITY_INPUT: "CITY_INPUT"
  , ADD_LOCATION: "ADD_LOCATION"
  , REMOVE_LOCATION: "REMOVE_LOCATION"
  , HTTP_SUCCESS: "HTTP_SUCCESS"
}

const APP_ID = "94b64a6167479ba6904363088af58651"
const OPEN_WEATHER_MAP_URL = "http://api.openweathermap.org/data/2.5/weather?units=imperial"

export function cityInputMsg(_value) {
  return {
    type: MSGS.CITY_INPUT
    , city: _value
  }
}

export function addLocationMsg() {
  return {
    type: MSGS.ADD_LOCATION
  }
}

export function removeLocationMsg(_id) {
  return {
    type: MSGS.REMOVE_LOCATION
    , id: _id
  }
}

// this is used for the response data from the openweathermap api
const httpSuccessMsg = R.curry((_id, _res) => {
  return {
    type: MSGS.HTTP_SUCCESS
    , id: _id
    , res: _res
  }
})

function update(_msg, _model) {
  if (_msg.type === "CITY_INPUT") {
    // update the model
    return {
      ..._model
      , city: _msg.city
    }
  }
  if (_msg.type === "ADD_LOCATION") {
    // looks to return an array containing a msg url request and the model
    return add(_model)
  }
  if (_msg.type === "REMOVE_LOCATION") {
    const {id} = _msg
    const {locations} = _model
    const updatedLocations = R.reject(R.propEq("id", id), locations)
    return {
      ..._model
      , locations: updatedLocations
    }
  }
  if (_msg.type === "HTTP_SUCCESS") {
    const {id, res} = _msg
    const {locations} = _model
    // res.data.main
    const {temp, temp_min, temp_max} = R.pathOr({}, ["data", "main"], res)
    const updatedLocations = R.map(location => {
      if (location.id === id) {
        // edit the location object
        return {
          ...location
          , temperature: Math.round(temp)
          , low: Math.round(temp_min)
          , high: Math.round(temp_max)
        }
      } else {
        // else return location untouched
        return location
      }
    }, locations)
    // return a new obj overriding the locations array
    return {
      ..._model
      , locations: updatedLocations
    }
  }

  // default case
  return _model
}

// helper fns
function add(_model) {
  const {nextId, city, locations} = _model
  // create a new location obj to add to list
  const location = {
    id: nextId
    , city
    , temperature: "?"
    , low: "?"
    , high: "?"
  }
  // overwrite list in model
  const updatedLocations = R.prepend(location, locations)

  // overwrite model
  return [{
      ..._model
      // overwrite
      , nextId: nextId + 1
      , city: ""
      , temperature: 0
      , low: 0
      , high: 0
      , locations: updatedLocations
    }
    // request msg obj
    , {
      request: {url: weatherUrl(city)}
      // partial application
      , successMsg: httpSuccessMsg(nextId)
    }
  ]
}

// api call: api.openweathermap.org/data/2.5/weather?q={city name}
function weatherUrl(location) {
  const encodedLocation = encodeURIComponent(location)
  return `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}&appid=${APP_ID}`
}

export default update
