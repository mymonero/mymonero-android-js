'use strict'

function _borderLayer (layer) {
  layer.style.border = `1px solid ${RandomColorHexString()}`
}
export const DEBUG_BorderLayer = _borderLayer
//
function DEBUG_BorderSubviews (ofView) {
  const self = ofView
  self.subviews.forEach(
    function (subview, i) {
      _borderLayer(subview.layer)
      DEBUG_BorderSubviews(subview) // recursive traversal
    }
  )
}
//
function DEBUG_BorderChildLayers (ofLayer) {
  const children = ofLayer.children
  const keysOf_children = Object.keys(children)
  keysOf_children.forEach(
    function (key, i) {
      const childLayer = children[key]
      //
      _borderLayer(childLayer)
      DEBUG_BorderChildLayers(childLayer)
    }
  )
}
//
function RandomColorHexString () {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}
export default { DEBUG_BorderSubviews, DEBUG_BorderChildLayers, RandomColorHexString }
