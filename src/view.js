import {h} from "virtual-dom"
import hh from "hyperscript-helpers"
import * as R from "ramda"

import {
  cityInputMsg
  , addLocationMsg
} from "./update"

const {
  pre
  , div
  , h1
  , form
  , td
  , tr
  , tbody
  , th
  , table
  , i
  , label
  , input
  , button
} = hh(h)

function _table(_className, _locations) {
  if (_locations.length === 0) {
  return div({className: "mv2 i black-50"}, "No locations to display...");
}
  return table({className: _className}, [
    tableHead("")
    , tableBody("", _locations)
  ])
}

function tableHead(_className) {
  return th({className: _className}, headerRow(""))
}

function headerRow(_className) {
  return tr({className: _className}, [
    cell(th, "pa2 bg-gray white", "City")
    , cell(th, "pa2 tr bg-gray white", "Temp")
    , cell(th, "pa2 tr bg-gray white", "Low")
    , cell(th, "pa2 tr bg-gray white", "High")
    , cell(th, "pa2 tr bg-gray white", "")
  ])
}

function tableBody(_className, _locations) {
  // rows is an array of table row elements
  const rows = R.map(R.partial(tableRow, ["stripe-dark"]), _locations)
  return tbody({className: _className}, [...rows])
}

function tableRow(_className, _item) {
  return tr({className: _className}, [
    cell(td, "pa2", _item.city)
    , cell(td, "pa2 tr", _item.temperature)
    , cell(td, "pa2 tr", _item.low)
    , cell(td, "pa2 tr", _item.high)
    , cell(td, "pa2 tr", i({className: "ph1 fas fa-times dim pointer"}))
  ])
}

function cell(_tag, _className, _data) {
  return _tag({className: _className}, _data)
}

function fieldSet(_dispatch, _value) {
  return input({
    className: "w-100 pa2 mv2 br2 ba b--black-40 input-reset dim"
    , type: "text"
    , value: _value
    , oninput: e => _dispatch( cityInputMsg(e.target.value) )
  })
}

function formView(_dispatch, _model) {
  return div({className: ""}, [
    form(
      {
        className: ""
        , onsubmit: e => {
          e.preventDefault()
          _dispatch(addLocationMsg())
        }
      }
      , [
        label({ className: 'f6 b db mb2' }, 'Location')
        , fieldSet(_dispatch, _model.city)
        , button({ className: 'pv2 ph3 br1', type: 'submit' }, 'Add')
      ]
    )
  ])
}

function view(_dispatch, _model) {
  return div(
    {className: "mw6 center"}
    , [
      h1({className: "f2 pv2 bb"}, "Weather APP V2")
      , formView(_dispatch, _model)
      , _table("w-100 collapse mv2", _model.locations)
      , pre( JSON.stringify(_model, null, 2) )
    ])
}

export default view
