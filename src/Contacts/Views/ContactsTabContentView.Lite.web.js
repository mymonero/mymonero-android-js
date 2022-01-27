'use strict'

import ContactsTabContentView_Base from './ContactsTabContentView_Base.web'
import ContactsDownloadAppEmptyScreenView from './ContactsDownloadAppEmptyScreenView.Lite.web'

class ContactsTabContentView extends ContactsTabContentView_Base {
  setup () {
    super.setup() // we must call on super
    //
    const self = this
    const view = new ContactsDownloadAppEmptyScreenView({}, self.context)
    self.SetStackViews(
      [
        view
      ]
    )
  }
}
export default ContactsTabContentView
