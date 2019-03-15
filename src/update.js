import * as R from "ramda"

const MSGS = {
  CITY_INPUT: "CITY_INPUT"
  , ADD_LOCATION: "ADD_LOCATION"
  , REMOVE_LOCATION: "REMOVE_LOCATION"
  , HTTP_SUCCESS: "HTTP_SUCCESS"
}

const APPID = '94b64a6167479ba6904363088af58651' // my appId

function weatherUrl(city) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${
    encodeURI(city)}&units=imperial&APPID=${APPID}`
}

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

// curried function
const httpSuccessMsg =  R.curry((_id, _res) => {
  return {
    type: MSGS.HTTP_SUCCESS
    , id: _id
    , response: _res
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
    const {id, response} = _msg
    const {locations} = _model
    // unpack the JSON response data
    const {temp, temp_min, temp_max} = R.pathOr({}, ["data", "main"], response)
    // assigns an updated locations array
    const updatedLocations = R.map(location => {
      if (location.id === id) {
        return {
          ...location
          , temperature: Math.round(temp)
          , low: Math.round(temp_min)
          , high: Math.round(temp_max)
        }
      }
    }, locations)
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
  const {nextId, city, temperature, low, high, locations} = _model
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
  // const locations = [
  //   ..._model.locations
  //   // overwrite
  //   , location
  // ]

  // overwrite model
  return {
    ..._model
    // overwrite
    , nextId: nextId + 1
    , city: ""
    , temperature: 0
    , low: 0
    , high: 0
    , locations: updatedLocations
  }
}

export default update
