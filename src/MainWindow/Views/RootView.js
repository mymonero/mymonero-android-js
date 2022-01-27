'use strict'

import View from '../../Views/View.web'
import ConnectivityMessageBarView from './ConnectivityMessageBarView'
import RootTabBarAndContentView from './RootTabBarAndContentView'
import PasswordEntryViewController from '../../Passwords/Controllers/PasswordEntryViewController.web'
import RootFooterView from './RootFooterView'

class RootView extends View {
  constructor (options, context) {
    super(options, context)

    const self = this
    self.setup()
  }

  setup () {
    const self = this
    self.setup_views()
  }

  setup_views () {
    const self = this

    const layer = self.layer
    layer.style.background = '#272527'
    layer.style.position = 'absolute'
    layer.style.width = '100%'
    layer.style.height = '100%'
    layer.style.left = '0px'
    layer.style.top = '0px'
    layer.style.overflow = 'hidden' // prevent scroll bar

    self.setup_tabBarAndContentView()
    self.setup_passwordEntryViewController() // this is technically a controller, not a view
    self.setup_connectivityMessageBarView()
    // disable space bar to scroll in document
    window.onkeydown = function (e) {
      if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault()
      }
    }
  }

  setup_tabBarAndContentView () {
    const self = this
    const tabBarViewAndContentView = new RootTabBarAndContentView({}, self.context)
    self.tabBarViewAndContentView = tabBarViewAndContentView
    self.addSubview(tabBarViewAndContentView)

    const layer = self.tabBarViewAndContentView.layer
    layer.style.height = 'calc(100% - 0px)'

    const footerView = new RootFooterView({}, self.context)
    self.footerView = footerView
    self.addSubview(footerView)
  }

  setup_passwordEntryViewController () { // overridden and not calling on super
    const self = this
    const passwordController = self.context.passwordController

    const passwordEntryViewController = new PasswordEntryViewController(self.tabBarViewAndContentView, passwordController)
    self.passwordEntryViewController = passwordEntryViewController
    passwordEntryViewController.on(
      passwordEntryViewController.EventName_willDismissView(),
      function () {
        self.tabBarViewAndContentView.SetTabBarItemButtonsInteractivityNeedsUpdateFromProviders()
      }
    )
    passwordEntryViewController.on(
      passwordEntryViewController.EventName_willPresentInView(),
      function () {
        self.tabBarViewAndContentView.DisableTabBarItemButtons()
      }
    )
  }

  setup_connectivityMessageBarView () {
    const self = this
    const view = new ConnectivityMessageBarView({}, self.context)
    self.connectivityMessageBarView = view
    self.addSubview(view)
  }
}

export default RootView
