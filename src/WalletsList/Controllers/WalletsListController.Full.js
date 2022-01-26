'use strict'

import WalletsListController_Base from './WalletsListController_Base'

class WalletsListController extends WalletsListController_Base {
  LiteAppWalletName () {
    return 'My Monero Wallet'
  }

  LiteAppWalletSwatchColor () // possibly change this to random color at some point
  {
    const self = this
    return self.BlueSwatchHexColorString()
  }
}
export default WalletsListController
