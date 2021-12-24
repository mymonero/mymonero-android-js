'use strict'

import RequestTabContentView_Base from './RequestTabContentView_Base.web'
import FundsRequestsListView from './FundsRequestsListView.web'

class RequestTabContentView extends RequestTabContentView_Base {
  setup () {
    super.setup() // we must call on super
    const self = this
    { // walletsListView
      const options = {}
      const view = new FundsRequestsListView(options, self.context)
      self.fundsRequestsListView = view
    }
    {
      self.SetStackViews(
        [
          self.fundsRequestsListView
        ]
      )
    }
  }
}
export default RequestTabContentView
