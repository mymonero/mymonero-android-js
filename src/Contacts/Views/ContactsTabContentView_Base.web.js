'use strict'

import StackAndModalNavigationView from '../../StackNavigation/Views/StackAndModalNavigationView.web'

class ContactsTabContentView extends StackAndModalNavigationView {
  setup () {
    super.setup() // we must call on super
    // override setup and set your own views
  }

  //
  //
  // Runtime - Accessors - Implementation of TabBarItem protocol - custom tab bar item styling
  //
  TabBarItem_layer_customStyle () {
    const self = this
    return {}
  }

  TabBarItem_icon_customStyle () {
    const self = this
    return {
      backgroundImage: 'url(./assets/img/icon_tabBar_contacts@3x.png)',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '24px 23px'
    }
  }

  TabBarItem_icon_selected_customStyle () {
    const self = this
    return {
      backgroundImage: 'url(./assets/img/icon_tabBar_contacts__active@3x.png)',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '24px 23px'
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
export default ContactsTabContentView
