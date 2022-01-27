'use strict'

import View from '../../Views/View.web'

class RootView extends View {
  constructor (options, context) {
    super(options, context)
    //
    const self = this
    self.setup()
  }

  setup () {
    const self = this
    self.setup_views()
  }

  setup_views () {
    const self = this
    {
      const layer = self.layer
      layer.style.background = '#272527'
      layer.style.position = 'absolute'
      layer.style.width = '100%'
      layer.style.height = '100%'
      layer.style.left = '0px'
      layer.style.top = '0px'
      layer.style.webkitAppRegion = 'drag' // make draggable
      layer.style.webkitUserSelect = 'none'
      layer.style.MozUserSelect = 'none'
      layer.style.msUserSelect = 'none'
      layer.style.cursor = 'default'
    }
    {
      const layer = document.createElement('a')
      const w = 50
      const h = 50
      layer.style.width = 50 + 'px'
      layer.style.height = 50 + 'px'
      layer.style.display = 'block'
      layer.style.outline = 'none'
      layer.style.backgroundSize = `${w}px ${h}px`
      layer.style.backgroundImage = 'url(./assets/img/logo_solid_light@3x.png)'
      layer.style.backgroundPosition = 'center'
      layer.style.backgroundRepeat = 'no-repeat'
      layer.style.margin = '66px auto 14px auto'
      layer.style.cursor = 'pointer'
      layer.href = 'https://' + self.context.appDownloadLink_domainAndPath
      layer.addEventListener('click', function (e) {
        e.preventDefault()
        window.open(this.href, '_blank')
        return false
      })

      self.layer.appendChild(layer)
    }
    {
      const layer = document.createElement('div')
      layer.style.width = '100%'
      layer.style.textAlign = 'center'
      layer.style.fontSize = '13px'
      layer.style.fontWeight = '400'
      layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
      layer.style.color = '#FCFBFC'
      layer.style.webkitFontSmoothing = 'subpixel-antialiased'
      layer.innerHTML = `Version ${self.context.version}`
      self.layer.appendChild(layer)
    }
    {
      const layer = document.createElement('a')
      layer.style.display = 'block' // to get width as 'a' tag
      layer.style.width = '100%'
      layer.style.textAlign = 'center'
      layer.style.textDecoration = 'none'
      layer.style.fontSize = '11px'
      layer.style.fontWeight = '400'
      layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
      layer.style.marginTop = '3px'
      layer.style.color = '#8D8B8D'
      layer.style.webkitFontSmoothing = 'subpixel-antialiased'
      layer.style.cursor = 'pointer'
      layer.innerHTML = 'View on GitHub'
      layer.href = 'https://www.github.com/mymonero/mymonero-app-js/releases/latest'
      layer.addEventListener('mouseenter', function (e) {
        layer.style.textDecoration = 'underline'
      })
      layer.addEventListener('mouseleave', function (e) {
        layer.style.textDecoration = 'none'
      })
      layer.addEventListener('click', function (e) {
        e.preventDefault()
        window.open(this.href, '_blank')
        return false
      })
      self.layer.appendChild(layer)
    }
  }
}
export default RootView
