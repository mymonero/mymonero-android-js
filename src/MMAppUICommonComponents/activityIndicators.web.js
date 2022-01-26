'use strict'

const className_onNormalBackground = 'on-normal-background'
const className_onAccentBackground = 'on-accent-background'

const loader_innerHTML =
'<div class="loader">' +
	'<div class="block block1"></div>' +
	'<div class="block block2"></div>' +
	'<div class="block block3"></div>' +
'</div>'
//
function New_Graphic_ActivityIndicatorLayer (isOnAccentBackground) {
  const layer = document.createElement('div')
  layer.classList.add('graphicOnly')
  layer.classList.add('activityIndicators')
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
  let style_str = ''
  customCSSByKey = customCSSByKey || {}
  const customCSSKeys = Object.keys(customCSSByKey)
  const customCSSKeys_length = customCSSKeys.length
  for (let i = 0; i < customCSSKeys_length; i++) {
    const cssKey = customCSSKeys[i]
    const cssValue = customCSSByKey[cssKey]
    style_str += `${cssKey}: ${cssValue}; `
  }
  let classes = 'graphicOnly activityIndicators'
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
  const layer = document.createElement('div')
  layer.classList.add('graphicAndLabel')
  layer.classList.add('activityIndicators')
  layer.classList.add(className_onNormalBackground)
  layer.style.fontFamily = 'Native-Regular, input, menlo, monospace'
  layer.style.fontSize = '11px'
  layer.style.fontWeight = 'lighter'
  layer.style.color = '#F8F7F8'
  //
  layer.Component_setMessageText = function (to_messageText) {
    const html = loader_innerHTML +
			'&nbsp;' +
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
