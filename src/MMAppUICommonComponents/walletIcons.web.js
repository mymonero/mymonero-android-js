'use strict'

import Views__cssRules from '../Views/cssRules.web'

const SizeClasses =
{
  Large48: 'large-48',
  Large43: 'large-43',
  Medium32: 'medium-32'
}

const NamespaceName = 'walletIcons'
const haveCSSRulesBeenInjected_documentKey = '__haveCSSRulesBeenInjected_' + NamespaceName
const cssRules =
[
	// set bg clr on .walletIcon and .walletIcon > span
	`.walletIcon {
	  position: relative;
	  background-repeat: no-repeat;
	  background-position: center;
	}`,
	//
	// size classes
	// large-48
	`.walletIcon.${SizeClasses.Large48} {
	  width: 48px;
	  height: 48px;
	  background-size: 48px 48px;
	}`,
	// large-43
	`.walletIcon.${SizeClasses.Large43} {
	  width: 43px;
	  height: 43px;
	  background-size: 43px 43px;
	}`,
	// medium-32
	`.walletIcon.${SizeClasses.Medium32} {
	  width: 32px;
	  height: 32px;
	  background-size: 32px 32px;
	}`
]
function __injectCSSRules_ifNecessary () {
  Views__cssRules.InjectCSSRules_ifNecessary(haveCSSRulesBeenInjected_documentKey, cssRules)
}
//
function New_WalletIconLayer (context, optl_sizeClass) {
  const sizeClass = optl_sizeClass || SizeClasses.Large48
  //
  __injectCSSRules_ifNecessary()
  //
  const div = document.createElement('div')
  div.classList.add('walletIcon')
  div.classList.add(sizeClass)
  //
  div.ConfigureWithHexColorString = function (to_hexColorString) {
    const to_hexColorString_sansPound = to_hexColorString.substring(1, to_hexColorString.length)
    div.style.backgroundImage = `url(./src/assets/img/wallet-${to_hexColorString_sansPound}@3x.png)`
  }
  //
  return div
}
export default { SizeClasses, New_WalletIconLayer }
