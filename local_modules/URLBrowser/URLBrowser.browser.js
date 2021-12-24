'use strict'

import URLBrowser_Abstract from './URLBrowser_Abstract'

//
class URLBrowser extends URLBrowser_Abstract {
  constructor (options, context) {
    super(options, context)
  }

  OpenURLInSystemBrowser (urlString) {
    const self = this
    window.open(urlString, '_blank') // _system..?
  }
}
export default URLBrowser
