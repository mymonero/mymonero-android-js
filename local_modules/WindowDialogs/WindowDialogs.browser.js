'use strict'

import WindowDialogs_Abstract from './WindowDialogs_Abstract'

class WindowDialogs extends WindowDialogs_Abstract {
  PresentQuestionAlertDialogWith (
    title,
    message,
    okButtonTitle,
    cancelButtonTitle,
    fn // (err?, didChooseYes?) -> Void
  ) {
    const self = this
    const trueIfUserClickedOK_notCancel = confirm(message) // add: title, buttons
    fn(null, trueIfUserClickedOK_notCancel)
  }
}
export default WindowDialogs
