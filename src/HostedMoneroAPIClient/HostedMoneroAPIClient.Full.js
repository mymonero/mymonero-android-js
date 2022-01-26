'use strict'

import HostedMoneroAPIClient_Base from './HostedMoneroAPIClient_Base'

class HostedMoneroAPIClient extends HostedMoneroAPIClient_Base {
  //
  // Lifecycle - Init
  constructor (options, context) {
    super(options, context)
  }

  //
  // Runtime - Accessors - Private - Requests - Overrides
  _new_apiAddress_authority () // authority means [subdomain.]host.…[:…]
  {
    const self = this
    const settingsController = self.context.settingsController
    if (settingsController.hasBooted != true) {
      throw 'Expected SettingsController to have been booted'
    }
    const specificAPIAddressURLAuthority = self.context.settingsController.specificAPIAddressURLAuthority || ''
    if (specificAPIAddressURLAuthority != '') {
      return specificAPIAddressURLAuthority
    }
    // fall back to mymonero server
    return super._new_apiAddress_authority()
  }
}
export default HostedMoneroAPIClient
