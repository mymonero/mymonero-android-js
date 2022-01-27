'use strict'

import StackAndModalNavigationView from '../../StackNavigation/Views/StackAndModalNavigationView.web'
import ExchangeContentView from './ExchangeContentView.web'

class ExchangeTabContentView extends StackAndModalNavigationView {
  setup () {
    super.setup() // we must call on super
    const self = this
    {
      const options = {}

      const view = new ExchangeContentView(options, self.context)
      self.exchangeContentView = view
    }
    self.SetStackViews(
      [
        self.exchangeContentView
      ]
    )
  }

  // TabBarItem_icon_customStyle () {
  // 	return 'tabButton-exchange'
  // }
  TabBarItem_layer_customStyle () {
    return {}
  }

  TabBarItem_icon_customStyle () {
    const self = this
    return {
      backgroundImage: 'url(./assets/img/XMRtoBTCInactive.svg)',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '39px',
      divId: 'tabButton-exchange'
    }
  }

  TabBarItem_icon_selected_customStyle () {
    const self = this
    return {
      backgroundImage: 'url(./assets/img/XMRtoBTCActive.svg)',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '39px'
    }
  }

  // interactivity
  TabBarItem_shallDisable () {
    const self = this
    const passwordController = self.context.passwordController
    if (passwordController.hasUserSavedAPassword !== true) {
      return true // no existing data - do disable
    }
    if (passwordController.HasUserEnteredValidPasswordYet() !== true) { // has data but not unlocked app
      return true // because the app needs to be unlocked before they can use it
    }
    if (passwordController.IsUserChangingPassword() === true) {
      return true // changing pw - prevent jumping around
    }
    const wallets = self.context.walletsListController.records // figure it's ready by this point
    const numberOf_wallets = wallets.length
    const walletsExist = numberOf_wallets !== 0
    const shallDisable = walletsExist == false // no wallets? disable
    return shallDisable
  }
}
export default ExchangeTabContentView
