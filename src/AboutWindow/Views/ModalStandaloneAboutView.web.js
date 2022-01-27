'use strict'

import RootView from './RootView'
import commonComponents_navigationBarButtons from '../../MMAppUICommonComponents/navigationBarButtons.web'

class ModalStandaloneAboutView extends RootView {
  Navigation_Title () {
    return 'About MyMonero'
  }

  Navigation_New_LeftBarButtonView () {
    const self = this
    const view = commonComponents_navigationBarButtons.New_LeftSide_CancelButtonView(self.context)
    const layer = view.layer
    layer.innerHTML = 'Close'
    layer.addEventListener(
      'click',
      function (e) {
        e.preventDefault()
        { // v--- self.navigationController because self is presented packaged in a StackNavigationView
          self.navigationController.modalParentView.DismissTopModalView(true)
        }
        return false
      }
    )
    return view
  }
}
export default ModalStandaloneAboutView
