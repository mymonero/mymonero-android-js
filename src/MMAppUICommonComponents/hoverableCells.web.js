'use strict'

import Views__cssRules from '../Views/cssRules.web'

const NamespaceName = 'hoverableCell'
const haveCSSRulesBeenInjected_documentKey = '__haveCSSRulesBeenInjected_' + NamespaceName
const cssRules =
[
	`.hoverable-cell {
		transition: background-color 0.1s ease-out;
	}`,
	`.hoverable-cell.utility:not(.disabled):not(.active):not([disabled]):hover {
		background-color: #3f3e3f !important;
	}`,
	`.hoverable-cell.action:not(.disabled):not(.active):not([disabled]):hover {
		background-color: #33d1ff !important;
	}`,
	`.hoverable-cell.destructive:not(.disabled):not(.active):not([disabled]):hover {
		background-color: #F77E7E !important;
	}`,
	`.hoverable-cell.disableable[disabled=disabled],
	 .hoverable-cell.disableable.disabled {
	 	opacity: 0.5;
	}`
]
function __injectCSSRules_ifNecessary () {
  Views__cssRules.InjectCSSRules_ifNecessary(haveCSSRulesBeenInjected_documentKey, cssRules)
}

const ClassFor_HoverableCell = function () {
  __injectCSSRules_ifNecessary()
  return 'hoverable-cell'
}

const ClassFor_GreyCell = function () {
  __injectCSSRules_ifNecessary()
  return 'utility'
}

const ClassFor_BlueCell = function () {
  __injectCSSRules_ifNecessary()
  return 'action'
}

const ClassFor_RedCell = function () {
  __injectCSSRules_ifNecessary()
  return 'destructive'
}

const ClassFor_Disableable = function () {
  __injectCSSRules_ifNecessary()
  return 'disableable'
}

let obj = {
  ClassFor_HoverableCell,
  ClassFor_GreyCell,
  ClassFor_BlueCell,
  ClassFor_RedCell,
  ClassFor_Disableable
}

export default obj
