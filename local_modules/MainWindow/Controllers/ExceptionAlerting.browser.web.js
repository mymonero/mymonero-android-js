'use strict'

const animationDuration_s = 0.5
const displayDelay_s = 20

import Views__cssRules from '../../Views/cssRules.web'

const NamespaceName = 'ExceptionAlerting'
const haveCSSRulesBeenInjected_documentKey = '__haveCSSRulesBeenInjected_' + NamespaceName
function cssRules_generatorFn (context) {
  const cssRules =
	[
		`.exceptiontoast {
			visibility: hidden;
			min-width: 250px;
			margin-left: -125px;
			background-color: #333;
			color: #F99999;
			text-align: left;
			border-radius: 4px;
			border: 1px solid rgba(255, 255, 255, 0.3);
			padding: 16px;
			position: fixed;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
			z-index: 500000000;
			left: 50%;
			bottom: 30px;
			font-size: 13px;
			font-weight: 500;

		    -webkit-touch-callout: all !important;
		    -webkit-text-size-adjust: all !important;
		    -webkit-user-select: all !important;

		    -moz-touch-callout: all !important;
		    -moz-text-size-adjust: all !important;
		    -moz-user-select: all !important;

		    -ms-touch-callout: all !important;
		    -ms-text-size-adjust: all !important;
		    -ms-user-select: all !important;

		    touch-callout: all !important;
		    text-size-adjust: all !important;
		    user-select: all !important;
		}`,
		`.exceptiontoast.show {
			visibility: visible;
			-webkit-animation: fadein_exceptiontoast ${animationDuration_s}s, fadeout_exceptiontoast ${animationDuration_s}s ${displayDelay_s}s;
			animation: fadein_exceptiontoast ${animationDuration_s}s, fadeout_exceptiontoast ${animationDuration_s}s ${displayDelay_s}s;
		}`,
		`@-webkit-keyframes fadein_exceptiontoast {
			from {bottom: 0; opacity: 0;} 
			to {bottom: 30px; opacity: 1;}
		}`,
		`@keyframes fadein_exceptiontoast {
			from {bottom: 0; opacity: 0;}
			to {bottom: 30px; opacity: 1;}
		}`,
		`@-webkit-keyframes fadeout_exceptiontoast {
			from {bottom: 30px; opacity: 1;} 
			to {bottom: 0; opacity: 0;}
		}`,
		`@keyframes fadeout_exceptiontoast {
			from {bottom: 30px; opacity: 1;}
			to {bottom: 0; opacity: 0;}
		}`
	]
  return cssRules
}
function __injectCSSRules_ifNecessary (context)
{
  // This is just an absolute wtf, and it's breaking ES6 migration
  Views__cssRules.InjectCSSRules_ifNecessary(
    haveCSSRulesBeenInjected_documentKey,
    cssRules_generatorFn,
    context
  )
  console.log('Tried to inject exception styles')
}
//
class ExceptionAlerting {
  constructor (options, context) {
    const self = this
    //
    self.options = options
    self.context = context
    //
    self.setup()
  }

  setup () {
    console.log('Setting up exception alerting')
		const self = this
    __injectCSSRules_ifNecessary(self.context)
    self._startObserving()
  }

  _startObserving () {
    const self = this
    window.onerror = function (message, file, line, col, error)
    {
      self.alertErrMsg(error.message, 1)
      return false
		}
    window.addEventListener('error', function (e)
    {
      self.alertErrMsg(e.error.message, 2)
      return false
		})
    window.addEventListener('unhandledrejection', function (e)
    {
      self.alertErrMsg(e.reason.message, 3)
      return false
    })
  }

  //
  // Imperatives
  alertErrMsg (message, handlerId) {
    const self = this
		self.doToastMessage('Unhandled error. Please inform MyMonero Support of this message: ' + message, message)
		if (message.indexOf('undefined') !== -1 && message.indexOf('handler') !== -1) {
      return // most likely an error from webflow - can skip erroring these ; TODO: remove this when removing webflow
    }
    if (typeof message !== 'undefined' && message && message !== '') {
      self.doToastMessage('Unhandled error. Please inform MyMonero Support of this message: ' + message, message)
		} else {
      self.doToastMessage('Unrecognized error occured. Please contact Support with steps and browser informations.', undefined)
    }
  }

  doToastMessage (message, raw_message) {
    let el = document.createElement('div')
    el.classList.add('exceptiontoast')
    el.appendChild(document.createTextNode(message)) // safely escape content
    document.body.appendChild(el)
    setTimeout(function () {
      el.classList.add('show')
      const finalRemoveDelay_s = animationDuration_s + displayDelay_s
      setTimeout(function () {
        el.classList.remove('show') // just so we can get the visibility:hidden in place -- probably not necessary
        el.parentNode.removeChild(el)
      }, finalRemoveDelay_s * 1000)
		})
  }
}
export default ExceptionAlerting
