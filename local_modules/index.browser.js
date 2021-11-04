'use strict'

import RootView from './MainWindow/Views/RootView.Lite.web' // electron uses .web files as it has a web DOM
import setup_utils from './MMAppRendererSetup/renderer_setup.browser'
import MyMoneroLibAppBridge from '@mymonero/mymonero-app-bridge'
import indexContextBrowser from './MainWindow/Models/index_context.browser'
import { Plugins } from '@capacitor/core'

const { App } = Plugins

window.BootApp = function () { // encased in a function to prevent scope being lost/freed on mobile
  const isDebug = false
  const version = '1.2.1'
  setup_utils({
    appVersion: version,
    reporting_processName: 'BrowserWindow'
  })
  //
  // context
  MyMoneroLibAppBridge({}).then(function (coreBridge_instance) {
    const context = indexContextBrowser.NewHydratedContext({
      nettype: 0,
      apiUrl: 'api.mymonero.com',
      version: version,
      name: 'MyMonero',
      isDebug: isDebug,
      Cordova_isMobile: false, // (this can be renamed or maybe deprecated)
      appDownloadLink_domainAndPath: 'mymonero.com',
      HostedMoneroAPIClient_DEBUGONLY_mockSendTransactionSuccess: false,
      monero_utils: coreBridge_instance
    })
    window.MyMonero_context = context
    { // configure native UI elements
      document.addEventListener('touchstart', function () {}, true) // to allow :active styles to work in your CSS on a page in Mobile Safari:
      // disable tap -> click delay on mobile browsers
      const attachFastClick = require('fastclick')
      attachFastClick.attach(document.body)
    }
    { // root view
      const rootView = new RootView({}, context) // hang onto reference
      rootView.superview = null // just to be explicit; however we will set a .superlayer
      // manually attach the rootView to the DOM and specify view's usual managed reference(s)
      const superlayer = document.body
      rootView.superlayer = superlayer
      superlayer.appendChild(rootView.layer) // the `layer` is actually the DOM element
    }
    { // and remove the loader (possibly fade this out)
      const el = document.getElementById('loading-spinner')
      el.parentNode.removeChild(el)
    }
  }).catch(function (e) {
    throw e
  })
  window.addEventListener('ionBackButton', (event) => {
    event.detail.register(10, () => {
      App.exitApp()
    })
  })
}
window.BootApp()

// Add event listener for exit
document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady () {
  App.addListener('backButton', (event) => {
    App.exitApp()
  })
}
