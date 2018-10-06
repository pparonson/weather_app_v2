const MSGS = {
  CITY_INPUT: "CITY_INPUT"
}

export function cityInputMsg(_value) {
  return {
    type: MSGS.CITY_INPUT
    , city: _value
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

  // default case
  return _model
}

export default update
