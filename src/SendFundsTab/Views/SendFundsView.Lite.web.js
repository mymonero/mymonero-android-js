'use strict'

import SendFundsView_Base from './SendFundsView_Base.web'
import commonComponents_contactPicker_Lite from '../../MMAppUICommonComponents/contactPicker.Lite.web'

class SendFundsView extends SendFundsView_Base {
  _new_required_contactPickerLayer () {
    const self = this
    const layer = commonComponents_contactPicker_Lite.New_contactPickerLayer_Lite(
      self.context,
      'Email, domain, or Monero address',
      function (event) { // didFinishTypingInInput_fn
        self._didFinishTypingInContactPickerInput(event)
      }
    )
    return layer
  }
}
export default SendFundsView
