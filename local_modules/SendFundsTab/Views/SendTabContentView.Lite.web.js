'use strict'

import SendTabContentView_Base from './SendTabContentView_Base.web'
import SendFundsView from './SendFundsView.Lite.web'

class SendTabContentView extends SendTabContentView_Base {
  _required_rootViewClassModule () {
    return SendFundsView
  }
}
export default SendTabContentView
