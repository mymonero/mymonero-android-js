'use strict'

import Opentip from './Vendor/opentip-native.min.js'
import commonComponents_tables from './tables.web'

const NamespaceName = 'tooltips'

function _once_listenForTouchStartToDismissTooltip () {
  const documentKey = NamespaceName + '_did_listenForMobileNonHoveringEventsToDismissTooltip'
  if (document[documentKey] !== true) {
    document[documentKey] = true
    //
    window.addEventListener('touchstart', function (e) {
      for (let i = 0; i < Opentip.tips.length; i++) {
        Opentip.tips[i].hide()
      }
    })
  }
}
//
function New_TooltipSpawningButtonView (tooltipText, context) {
  const buttonTitle = '?'
  const view = commonComponents_tables.New_clickableLinkButtonView(buttonTitle, context)
  const layer = view.layer
  layer.style.marginLeft = '7px'
  layer.style.display = 'inline' // same line
  layer.style.float = 'none'
  layer.style.clear = 'none' // must unset
  const tooltip_options =
	{
	  target: true, // target trigger (`layer`)
	  tipJoint: 'bottom center',
	  containInViewport: true,
	  //
	  stemBase: 14,
	  stemLength: 13,
	  //
	  background: '#FCFBFC',
	  //
	  borderWidth: 0,
	  borderRadius: 5,
	  //
	  shadow: true,
	  shadowBlur: 38,
	  shadowOffset: [0, 19],
	  shadowColor: 'rgba(0,0,0,0.26)'
	}
  tooltip_options.showOn = 'click'
  tooltip_options.hideOn = 'click'
  _once_listenForTouchStartToDismissTooltip()
  const tooltip = new Opentip(layer, tooltip_options)
  tooltip.setContent(tooltipText)
  return view
}
const obj = { New_TooltipSpawningButtonView }
export default obj
