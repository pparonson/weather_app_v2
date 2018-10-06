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
    model = _update(_msg, model)
    const updatedView = _view(dispatch, model)
    // compare currentView to updatedView
    const patches = diff(currentView, updatedView)
    // Update the DOM with the results of a diff
    rootNode = patch(rootNode, patches)
    currentView = updatedView
  }
}

export default app
