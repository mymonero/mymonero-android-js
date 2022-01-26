'use strict'

import PasteboardInterface from './PasteboardInterface'
import ClipboardJS from './Vendor/clipboard.min.js'

class Pasteboard extends PasteboardInterface {
  constructor (options, context) {
    super(options, context)
    const self = this
    self.clipboard = new ClipboardJS('.copy-trigger') // must initialize this - and it will watch the DOM
  }

  //
  IsHTMLCopyingSupported () {
    return false
  }

  //
  CopyString (string, contentType_orText) {
    const self = this
    // nothing to do here since we are using ClipboardJS and relying on "data-clipboard-text"
  }

  CopyValuesByType (valuesByType) {
    const self = this
    // nothing to do here since we are using ClipboardJS and relying on "data-clipboard-text"
  }
}
export default Pasteboard
