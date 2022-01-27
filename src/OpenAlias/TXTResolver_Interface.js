'use strict'

class TXTResolver_Interface {
  constructor (options) {
    const self = this
    {
      self.options = options
    }
  }

  //
  // Accessors
  TXTRecords (
    hostname,
    fn // (records, dnssec_used, secured, dnssec_fail_reason) -> Void
  ) {
    throw 'Override and implement TXTRecords(...)'
  }
}
export default TXTResolver_Interface
