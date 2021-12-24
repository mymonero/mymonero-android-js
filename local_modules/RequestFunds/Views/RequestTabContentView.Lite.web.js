'use strict'

import RequestTabContentView_Base from './RequestTabContentView_Base.web'
import RequestsDownloadAppEmptyScreenView from './RequestsDownloadAppEmptyScreenView.Lite.web'

class RequestTabContentView extends RequestTabContentView_Base {
  setup () {
    const self = this
    super.setup() // we must call on super
    //
    const view = new RequestsDownloadAppEmptyScreenView({}, self.context)
    self.SetStackViews(
      [
        view
      ]
    )
  }
}
export default RequestTabContentView
