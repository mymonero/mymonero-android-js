'use strict'

import EventEmitter from 'events'

const PROTOCOL_PREFIX = 'monero' // this is also specified for MacOS in packager.js under scheme
// maybe support "mymonero" too
//
class URLOpeningController_Abstract extends EventEmitter {
  //
  // Lifecycle - Init
  constructor (options, context) {
    super() // must call before accessing `this`
    const self = this
    self.options = options
    self.context = context
    self.setup()
  }

  setup () {
    const self = this
    self._override_startObserving()
  }

  _override_startObserving () {
    const self = this
  }

  //
  // Runtime - Accessors
  EventName_ReceivedURLToOpen_FundsRequest () {
    return 'EventName_ReceivedURLToOpen_FundsRequest'
  }

  PROTOCOL_PREFIX () {
    return PROTOCOL_PREFIX
  }

  //
  // Delegation - URL reception, launch handling
  __didReceivePossibleURIToOpen (possibleURI, willConsiderAsURI_fn) {
    willConsiderAsURI_fn = willConsiderAsURI_fn || function () {}
    const self = this
    if (possibleURI.indexOf(PROTOCOL_PREFIX + ':') !== 0) {
      self._override_didReceiveInvalidURL()
      return
    }
    const url = possibleURI // we'll suppose it is one
    self.emit( // and yield
      self.EventName_ReceivedURLToOpen_FundsRequest(),
      url
    )
  }
}
export default URLOpeningController_Abstract
