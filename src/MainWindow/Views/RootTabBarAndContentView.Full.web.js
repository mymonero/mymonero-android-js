'use strict'

import RootTabBarAndContentView_Base from './RootTabBarAndContentView_Base.web'
import WalletsTabContentView from '../../WalletsList/Views/WalletsTabContentView.web'
import SendTabContentView from '../../SendFundsTab/Views/SendTabContentView.Full.web'
import RequestTabContentView from '../../RequestFunds/Views/RequestTabContentView.web'
import ContactsTabContentView from '../../Contacts/Views/ContactsTabContentView.web'
import SettingsTabContentView from '../../Settings/Views/SettingsTabContentView.web'
import ExchangeTabContentView from '../../Exchange/Views/ExchangeTabContentView.web'

class RootTabBarAndContentView_Full extends RootTabBarAndContentView_Base {
  constructor (options, context) {
    super(options, context)
  }

  _setup_addTabBarContentViews () {
    const self = this
    const context = self.context
    self.walletsTabContentView = new WalletsTabContentView({}, context)
    self.sendTabContentView = new SendTabContentView({}, context)
    self.requestTabContentView = new RequestTabContentView({}, context)
    self.contactsTabContentView = new ContactsTabContentView({}, context)
    self.exchangeTabContentView = new ExchangeTabContentView({}, context)
    self.settingsTabContentView = new SettingsTabContentView({}, context)

    self.SetTabBarContentViews(
      [
        self.walletsTabContentView,
        self.sendTabContentView,
        self.requestTabContentView,
        self.contactsTabContentView,
        self.exchangeTabContentView,
        self.settingsTabContentView
      ]
    )
  }
}
export default RootTabBarAndContentView_Full
