import {diff, patch} from "virtual-dom"
import createElement from "virtual-dom/create-element"

// WARNING: IMPURE CODE BELOW
function app(_node, _update, _view, _model) {
  let model = _model
  let currentView = _view(dispatch, model)
  let rootNode = createElement(currentView)

  // render the currentView to the DOM
  _node.appendChild(rootNode)

  // update model state and view
  function dispatch(_msg) {

  }
}

export default app
