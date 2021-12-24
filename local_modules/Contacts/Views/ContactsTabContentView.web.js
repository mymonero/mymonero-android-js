'use strict'

import ContactsTabContentView_Base from './ContactsTabContentView_Base.web'
import ContactsListView from './ContactsListView.web'

class ContactsTabContentView extends ContactsTabContentView_Base {
  setup () {
    super.setup() // we must call on super
    const self = this
    {
      const options = {}

      const view = new ContactsListView(options, self.context)
      self.contactsListView = view
    }
    self.SetStackViews(
      [
        self.contactsListView
      ]
    )
  }
}
export default ContactsTabContentView
