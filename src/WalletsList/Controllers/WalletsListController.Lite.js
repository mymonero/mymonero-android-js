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

  //
  //
  CreateNewWallet_NoBootNoListAdd (
    fn, // fn: (err: Error?, walletInstance: Wallet) -> Void
    optl_locale_code
  ) {
    const self = this
    if (self.records.length > 0) {
      fn(new Error('Browser app only supports one wallet at a time'))
      return
    }
    super.CreateNewWallet_NoBootNoListAdd(fn, optl_locale_code)
  }

  WhenBooted_ObtainPW_AddNewlyGeneratedWallet (
    walletInstance,
    walletLabel,
    swatch,
    fn, // fn: (err: Error?, walletInstance: Wallet) -> Void
    optl__userCanceledPasswordEntry_fn
  ) {
    const self = this
    if (self.records.length > 0) {
      fn(new Error('Browser app only supports one wallet at a time'))
      return
    }
    super.WhenBooted_ObtainPW_AddNewlyGeneratedWallet(
      walletInstance,
      walletLabel,
      swatch,
      fn,
      optl__userCanceledPasswordEntry_fn
    )
  }

  WhenBooted_ObtainPW_AddExtantWalletWith_MnemonicString (
    walletLabel,
    swatch,
    mnemonicString,
    fn, // fn: (err: Error?, walletInstance: Wallet, wasWalletAlreadyInserted: Bool?) -> Void
    optl__userCanceledPasswordEntry_fn
  ) {
    const self = this
    if (self.records.length > 0) {
      fn(new Error('Browser app only supports one wallet at a time'))
      return
    }
    super.WhenBooted_ObtainPW_AddExtantWalletWith_MnemonicString(
      walletLabel,
      swatch,
      mnemonicString,
      fn,
      optl__userCanceledPasswordEntry_fn
    )
  }

  WhenBooted_ObtainPW_AddExtantWalletWith_AddressAndKeys (
    walletLabel,
    swatch,
    address,
    view_key__private,
    spend_key__private,
    fn, // fn: (err: Error?, walletInstance: Wallet, wasWalletAlreadyInserted: Bool?) -> Void
    optl__userCanceledPasswordEntry_fn
  ) {
    const self = this
    if (self.records.length > 0) {
      fn(new Error('Browser app only supports one wallet at a time'))
      return
    }
    super.WhenBooted_ObtainPW_AddExtantWalletWith_AddressAndKeys(
      walletLabel,
      swatch,
      address,
      view_key__private,
      spend_key__private,
      fn,
      optl__userCanceledPasswordEntry_fn
    )
  }
}
export default WalletsListController
