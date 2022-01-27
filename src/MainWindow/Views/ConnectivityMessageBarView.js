'use strict'

import View from '../../Views/View.web'

class ConnectivityMessageBarView extends View {
  constructor (options, context) {
    super(options, context)
    //
    const self = this
    self.setup()
  }

  setup () {
    const self = this
    self.setup_views()
    self.startObserving()
    //
    self.configureUI()
  }

  setup_views () {
    const self = this
    self.setup_layer()
  }

  setup_layer () {
    const self = this
    const layer = self.layer
    layer.style.position = 'fixed'
    layer.style.zIndex = 100
    let leftMargin = 16

    layer.style.width = `calc(100% - ${leftMargin}px - 16px)`
    layer.style.minHeight = '24px'
    layer.style.padding = '4px 8px'
    layer.style.left = `${leftMargin}px`
    layer.style.top = '44px'
    layer.innerHTML = 'No Internet Connection Found'
    //
    layer.style.background = 'rgba(49,47,43,1)'
    layer.style.border = '0.5px solid rgba(245,230,125,0.30)'
    layer.style.textShadow = '0 1px 0 rgba(0, 0, 0, 0.6)'
    layer.style.boxShadow = '0 1px 4px 0 rgba(0,0,0,0.40)'
    layer.style.borderRadius = '3px'
    layer.style.boxSizing = 'border-box'
    layer.style.color = '#F5E67E'
    layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    layer.style.fontSize = '11px'
    layer.style.fontWeight = '600' // semibold desired but "semibold" doesn't apparently work
    layer.style.wordBreak = 'break-word'
  }

  startObserving () {
    const self = this
    window.addEventListener('load', function () {
      window.addEventListener('online', function () { self.configureUI() })
      window.addEventListener('offline', function () { self.configureUI() })
    })
  }

  //
  configureUI () {
    const self = this
    const isOnLine = navigator.onLine
    if (isOnLine) {
      self.layer.style.display = 'none'
    } else {
      self.layer.style.display = 'block'
    }
  }
}
export default ConnectivityMessageBarView
