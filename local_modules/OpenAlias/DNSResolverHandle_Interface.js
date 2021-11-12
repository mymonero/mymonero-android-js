'use strict'

class DNSResolverHandle_Interface {
  constructor () {}
  //
  // Accessors
  abort () {
    throw 'Object must implement .abort()'
  }
}
export default DNSResolverHandle_Interface
