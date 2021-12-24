'use strict'

function StartExceptionReporting (
  exceptionReporterOptions_requiredModule,
  appVersion,
  exceptionReporting_processName
) {
  // NOTE: Calls to StartExceptionReporting should also be commented (we deemed the risk of an info leak too great.)
  // const Raven = require('raven') // we're using the Node.JS raven package here for now because of https://github.com/getsentry/raven-js/issues/812 … any downsides?
  // const options = exceptionReporterOptions_requiredModule(appVersion, exceptionReporting_processName)
  // const sentry_dsn = options.sentry_dsn
  // const raven_params =
  // {
  // 	autoBreadcrumbs: options.autoBreadcrumbs,
  // 	release: options.release,
  // 	environment: options.environment,
  // 	extra: options.extra
  // }
  // Raven.config(sentry_dsn, raven_params).install()
}
//
function StartAlertingExceptions () {
  process.on(
    'uncaughtException',
    function (error) {
      let errStr = 'An unexpected application error occurred.\n\nPlease let us know of ';
      if (error) {
        errStr += 'the following error message as it could be a bug:\n\n' + error.toString()
        if (error.stack) {
          errStr += '\n\n' + error.stack
        }
      } else {
        errStr += 'this issue as it could be a bug.'
      }
      alert(errStr)
    }
  )
}
//
function HardenRuntime (options) {
  options = options || {}
  const isBrowserBuild = options.isBrowserBuild == true
  //
  if (isBrowserBuild != true) { // we used to disable eval for browser builds as well but now use it there when fallback to asmjs is needed
    window.eval = global.eval = function () {
      throw new Error('MyMonero does not support window.eval() for security reasons.')
    }
  }
}
//
function IdentifyRuntime (runtimeNameFlag) {
  window[runtimeNameFlag] = true // e.g. IsElectronRendererProcess
}

const obj = { StartExceptionReporting, StartAlertingExceptions, HardenRuntime, IdentifyRuntime }

export default obj
