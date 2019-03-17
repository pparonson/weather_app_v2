import {diff, patch} from "virtual-dom"
import createElement from "virtual-dom/create-element"
import axios from "axios"
import * as R from "ramda"

// WARNING: IMPURE CODE BELOW
function app(_node, _update, _view, _model) {
  let model = _model
  let currentView = _view(dispatch, model)
  let rootNode = createElement(currentView)

  // render the currentView to the DOM
  _node.appendChild(rootNode)

  // update model state and view
  function dispatch(_msg) {
    const updates = _update(_msg, model)
    const isArray  = R.type(updates) === "Array"
    model = isArray ? updates[0] : updates
    const msg = isArray ? updates[1] : null
    httpEffects(dispatch, msg)
    const updatedView = _view(dispatch, model)
    // compare currentView to updatedView
    const patches = diff(currentView, updatedView)
    // Update the DOM with the results of a diff
    rootNode = patch(rootNode, patches)
    currentView = updatedView
  }
}

// helper fns
function httpEffects(_dispatch, _msg) {
  if (_msg === null) {
    return
  } else {
    // the successMsg is carrying the id
    const {request, successMsg} = _msg
    axios(request)
      .then(res => _dispatch(successMsg(res)))
  }
}

export default app
