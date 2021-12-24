'use strict'

import View from '../Views/View.web'
import emoji_web from '../Emoji/emoji_web'

const default__margin_h = 16
const default__margin_v = 18

import Views__cssRules from '../Views/cssRules.web'

const NamespaceName = 'emptyScreens'
const haveCSSRulesBeenInjected_documentKey = '__haveCSSRulesBeenInjected_' + NamespaceName
const cssRules =
[
	`.${NamespaceName} {
		position: relative;
		display: table; /* for valign */
		border: 1px solid #373537;
		border-radius: 5px;
	}`,
	`.${NamespaceName} .content-container .message-label {
		margin: 0 0 0 0;
		width: 100%;
		height: auto;
		line-height: 19px;
		color: #9e9c9e;
		text-align: center;
	}`,
	`.${NamespaceName} .content-container .emoji-label {
		margin: 0 0 23px 0;
		width: 100%;
		height: 21px;
		font-size: 13px;
		text-align: center;
		-webkit-font-smoothing: subpixel-antialiased;
	}`,
	`.${NamespaceName} .content-container .emoji-label .emojione {
		transform: scale(.5);
		margin-left: 0px;
		margin-top: 1px;
	}`
]
function __injectCSSRules_ifNecessary () { Views__cssRules.InjectCSSRules_ifNecessary(haveCSSRulesBeenInjected_documentKey, cssRules) }
//
function New_EmptyStateMessageContainerView (
  optl_emoji,
  optl_messageText,
  context,
  optl_explicitMarginH,
  optl_explicitMarginV,
  optl_contentTranslateYPX
) {
  __injectCSSRules_ifNecessary()
  //
  const nativeEmoji = typeof optl_emoji === 'string' ? optl_emoji : '😀'
  const messageText = typeof optl_messageText === 'string' ? optl_messageText : ''
  const margin_h = typeof optl_explicitMarginH !== 'undefined' ? optl_explicitMarginH : default__margin_h
  const margin_v = typeof optl_explicitMarginV !== 'undefined' ? optl_explicitMarginV : default__margin_v
  const view = new View({}, context)
  {
    view.__EmptyStateMessageContainerView_margin_h = margin_h
    view.__EmptyStateMessageContainerView_margin_v = margin_v
  }
  {
    const layer = view.layer
    layer.classList.add(NamespaceName)
    layer.style.width = `calc(100% - ${2 * margin_h}px - 2px)` // -2px for border
    layer.style.height = `calc(100% - ${2 * margin_v}px - 2px)` // -2px for border
    layer.style.margin = `${margin_v}px ${margin_h}px`
  }
  let contentContainerLayer
	{
    const layer = document.createElement('div')
    layer.classList.add('content-container')
    layer.style.display = 'table-cell'
    layer.style.verticalAlign = 'middle'
    const translateY_px = typeof optl_contentTranslateYPX === 'undefined' ? -16 : optl_contentTranslateYPX
    layer.style.transform = 'translateY(' + translateY_px + 'px)' // pull everything up per design

    contentContainerLayer = layer
    view.layer.appendChild(layer)
  }
  let emoji_layer
	{
    const layer = document.createElement('div')
    layer.classList.add('emoji-label')
    emoji_layer = layer
    const emoji = emoji_web.NativeEmojiTextToImageBackedEmojiText_orUnlessDisabled_NativeEmojiText(
      context,
      nativeEmoji
    )
    layer.innerHTML = emoji
    contentContainerLayer.appendChild(layer)
  }
  let message_layer
	{
    const layer = document.createElement('div')
    layer.classList.add('message-label')
    layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    layer.style.letterSpacing = '0'
    layer.style.fontSize = '13px'
    layer.style.fontWeight = 'normal'
    message_layer = layer
    layer.innerHTML = messageText

    contentContainerLayer.appendChild(layer)
  }
  view.SetContent = function (to_emoji, to_message) {
    emoji_layer.innerHTML = emoji_web.NativeEmojiTextToImageBackedEmojiText_orUnlessDisabled_NativeEmojiText(
      context,
      to_emoji
    )
    message_layer.innerHTML = to_message
  }
  return view
}

const obj = {
  New_EmptyStateMessageContainerView
}
export default obj
