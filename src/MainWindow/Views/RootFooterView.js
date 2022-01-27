'use strict'

import View from '../../Views/View.web'

class RootFooterView extends View {
  constructor (options, context) {
    super(options, context)

    const self = this
    self.setup()
  }

  setup () {
    const self = this
    const layer = self.layer
    layer.style.height = '32px'
    layer.style.backgroundColor = '#171416'
  }
}
export default RootFooterView
