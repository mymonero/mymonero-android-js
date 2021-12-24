'use strict'

import RootView_Base from './RootView_Base.web'
import PasswordEntryViewController from '../../Passwords/Controllers/PasswordEntryViewController.web'
import RootFooterView from './RootFooterView.web'
//
class RootView extends RootView_Base {
  constructor (options, context) {
    super(options, context)
  }

  setup_tabBarAndContentView () {
    super.setup_tabBarAndContentView() // must call first
    //
    const self = this
    const layer = self.tabBarViewAndContentView.layer
    layer.style.height = 'calc(100% - 0px)'
    //
    const footerView = new RootFooterView({}, self.context)
    self.footerView = footerView
    self.addSubview(footerView)
  }

  setup_passwordEntryViewController () { // overridden and not calling on super
    const self = this
    const passwordController = self.context.passwordController

    const passwordEntryViewController = new PasswordEntryViewController(self.tabBarViewAndContentView, passwordController)
    self.passwordEntryViewController = passwordEntryViewController
    {
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
  }
}
export default RootView
