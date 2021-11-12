'use strict'

import AddContactView from '../../Contacts/Views/AddContactView.web'
import ContactDetailsView from './ContactDetailsView.web'

class AddContactFromContactsTabView extends AddContactView {
  setup () {
    super.setup()
  }

  //
  //
  // Runtime - Accessors - Navigation
  //
  Navigation_Title () {
    return 'New Contact'
  }

  //
  //
  // Runtime - Delegation - Overrides
  //
  _didSaveNewContact (contact) {
    const self = this
    {
      const options =
			{
			  record: contact // note: options takes `record`, not `contact`
			}
      const view = new ContactDetailsView(options, self.context)
      const modalParentView = self.navigationController.modalParentView
      const underlying_navigationController = modalParentView
      underlying_navigationController.PushView(view, false) // not animated
    }
    super._didSaveNewContact(contact) // this will cause self to be dismissed!! so, last-ish
  }
}
export default AddContactFromContactsTabView
