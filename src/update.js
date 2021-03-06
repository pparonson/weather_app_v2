import * as R from "ramda"

const MSGS = {
  CITY_INPUT: "CITY_INPUT"
  , ADD_LOCATION: "ADD_LOCATION"
  , REMOVE_LOCATION: "REMOVE_LOCATION"
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

  // default case
  return _model
}

// helper fns
function add(_model) {
  const {nextId, city, temperature, low, high} = _model
  // create a new location obj to add to list
  const location = {
    id: nextId
    , city
    , temperature: "?"
    , low: "?"
    , high: "?"
  }
  // overwrite list in model
  const locations = [
    ..._model.locations
    // overwrite
    , location
  ]
  // overwrite model
  return {
    ..._model
    // overwrite
    , nextId: nextId + 1
    , city: ""
    , temperature: 0
    , low: 0
    , high: 0
    , locations
  }
}

export default update
