'use strict'

import Views__cssRules from '../Views/cssRules.web'

const className_onNormalBackground = 'on-normal-background'
const className_onAccentBackground = 'on-accent-background'
const NamespaceName = 'activityIndicators'
const haveCSSRulesBeenInjected_documentKey = '__haveCSSRulesBeenInjected_' + NamespaceName
const cssRules =
[
	`.${NamespaceName} .loader > .block  {
		margin: 1px;
		float: left;
		width: 3px;
		height: 8px;
		border-radius: 2px;
		box-shadow: inset 0 1px 0 rgba(73, 71, 73, 0.5), 0 1px 1px rgba(0, 0, 0, 0.3);
	}`,
	`.${NamespaceName}.${className_onNormalBackground} .loader > .block  {
		background-color: #383638;
		animation: block-animate-normal-bg .75s infinite ease-in-out;
	}`,
	`.${NamespaceName}.${className_onAccentBackground} .loader > .block  {
		background-color: #5A585A;
		animation: block-animate-on-accent-bg .75s infinite ease-in-out;
	}`,
	/*
  		the following animation-delays use "!important" as a short-cut to give the CSS rules more
  	 weight than the above "on*Background" variants' "animation" styles which would override the delay
  	 */
	`.${NamespaceName} .loader > .block1 {
		animation-delay: -1.2s !important;
	}`,
	`.${NamespaceName} .loader > .block2 {
		animation-delay: -1.0s !important;
	}`,
	`.${NamespaceName} .loader > .block3 {
		animation-delay: -0.8s !important;
	}`,
	`@keyframes block-animate-normal-bg {
		0%, 20%, 60%, 100% {
			transform: translateY(2px);
			background-color: #383638;
		}
		40% {
			transform: translateY(0);
			background-color: #494749;
		}
	}`,
	`@keyframes block-animate-on-accent-bg {
		0%, 20%, 60%, 100% {
			transform: translateY(2px);
			background-color: #5A585A;
		}
		40% {
			transform: translateY(0);
			background-color: #7C7A7C;
		}
	}`,
	//
	// .graphicAndLabel
	`.${NamespaceName}.graphicAndLabel {
		padding: 8px 10px 7px 32px;
	}`,
	`.${NamespaceName}.graphicAndLabel > div.loader {
		display: inline-block;
		position: relative;
		top: 0px;
	}`,
	`.${NamespaceName}.graphicAndLabel > span {
		display: inline-block;
	}`
]
function __injectCSSRules_ifNecessary () { Views__cssRules.InjectCSSRules_ifNecessary(haveCSSRulesBeenInjected_documentKey, cssRules) }
//
const loader_innerHTML =
'<div class="loader">'+
	'<div class="block block1"></div>'+
	'<div class="block block2"></div>'+
	'<div class="block block3"></div>'+
'</div>'
//
function New_Graphic_ActivityIndicatorLayer (isOnAccentBackground) {
  __injectCSSRules_ifNecessary()
  //
  const layer = document.createElement('div')
  layer.classList.add('graphicOnly')
  layer.classList.add(NamespaceName)
  if (isOnAccentBackground) {
    layer.classList.add(className_onAccentBackground)
  } else {
    layer.classList.add(className_onNormalBackground)
  }
  layer.innerHTML = loader_innerHTML

  //
  return layer
}
//
function New_Graphic_ActivityIndicatorLayer_htmlString (customCSSByKey, isOnAccentBackground) {
  __injectCSSRules_ifNecessary()
  //
  let style_str = ''
  customCSSByKey = customCSSByKey || {}
  const customCSSKeys = Object.keys(customCSSByKey)
  const customCSSKeys_length = customCSSKeys.length
  for (let i = 0; i < customCSSKeys_length; i++) {
    const cssKey = customCSSKeys[i]
    const cssValue = customCSSByKey[cssKey]
    style_str += `${cssKey}: ${cssValue}; `
  }
  let classes = `graphicOnly ${NamespaceName}`
  if (isOnAccentBackground) {
    classes += ' ' + className_onAccentBackground
  } else {
    classes += ' ' + className_onNormalBackground
  }
  const htmlString = `<div class="${classes}" style="${style_str}">` +
		loader_innerHTML +
		'</div>'
  //
  return htmlString
}
//
function New_GraphicAndLabel_ActivityIndicatorLayer (messageText, context) { // no support for isOnAccentBackground yet
  __injectCSSRules_ifNecessary()
  const layer = document.createElement('div')
  layer.classList.add('graphicAndLabel')
  layer.classList.add(NamespaceName)
  layer.classList.add(className_onNormalBackground)
  layer.style.fontFamily = 'Native-Regular, input, menlo, monospace'
  layer.style.fontSize = '11px'
  layer.style.fontWeight = 'lighter'
  layer.style.color = '#F8F7F8'
  //
  layer.Component_setMessageText = function (to_messageText) {
    const html = loader_innerHTML+
			'&nbsp;'+
			`<span>${to_messageText}</span>`
    layer.innerHTML = html
  }
  layer.Component_setMessageText(messageText)
  //
  return layer
}
function New_Resolving_ActivityIndicatorLayer (context) {
  const layer = New_GraphicAndLabel_ActivityIndicatorLayer( // will call `__inject…`
    'RESOLVING…',
    context
  )
  return layer
}
const obj = { New_Graphic_ActivityIndicatorLayer, New_Graphic_ActivityIndicatorLayer_htmlString, New_GraphicAndLabel_ActivityIndicatorLayer, New_Resolving_ActivityIndicatorLayer }
export default obj
