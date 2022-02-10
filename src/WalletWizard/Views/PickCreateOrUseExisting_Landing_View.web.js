'use strict'

import commonComponents_navigationBarButtons from '../../MMAppUICommonComponents/navigationBarButtons.web'
import commonComponents_emptyScreens from '../../MMAppUICommonComponents/emptyScreens.web'
import commonComponents_actionButtons from '../../MMAppUICommonComponents/actionButtons.web'
import BaseView_AWalletWizardScreen from './BaseView_AWalletWizardScreen.web'

class PickCreateOrUseExisting_Landing_View extends BaseView_AWalletWizardScreen {
  _setup_views () {
    const self = this
    super._setup_views()
    self._setup_emptyStateMessageContainerView()
    self._setup_actionButtonsContainerView()
    { // update empty state message container to accommodate
      const margin_v = self.emptyStateMessageContainerView.__EmptyStateMessageContainerView_margin_v
      self.emptyStateMessageContainerView.layer.style.height =
        `calc(100% - ${2 * margin_v}px + 3px - ${self.actionButtonsContainerView.layer.style.height/* no'px' */})`
      self.emptyStateMessageContainerView.layer.id = "addWalletScreen"
    }
  }

  _setup_emptyStateMessageContainerView () {
    const self = this
    const view = commonComponents_emptyScreens.New_EmptyStateMessageContainerView(
      '🤔',
      'How would you like to</br>add a wallet?',
      self.context,
      16,
      19
    )
    const layer = view.layer
    layer.style.marginBottom = '0' // not going to use margin on the btm because action bar is there
    self.emptyStateMessageContainerView = view
    self.addSubview(view)
  }

  _setup_actionButtonsContainerView () {
    const self = this
    const margin_h = self.emptyStateMessageContainerView.__EmptyStateMessageContainerView_margin_h
    const margin_v = self.emptyStateMessageContainerView.__EmptyStateMessageContainerView_margin_v
    const view = commonComponents_actionButtons.New_Stacked_ActionButtonsContainerView(
      margin_h,
      margin_h,
      margin_v - 3, // top
      self.context
    )
    self.actionButtonsContainerView = view
    {
      self._setup_actionButton_useExistingWallet()
      self._setup_actionButton_createNewWallet()
    }
    view.id = "addWalletActionButtons";
    self.addSubview(view)
  }

  _setup_actionButton_useExistingWallet () {
    const self = this
    const buttonView = commonComponents_actionButtons.New_ActionButtonView(
      'Use existing wallet',
      null, // no image
      false,
      function (layer, e) {
        self.wizardController.PatchToDifferentWizardTaskMode_byPushingScreen(
          self.wizardController.WizardTask_Mode_AfterPick_UseExisting(),
          1 // first screen after 0 - maintain ability to hit 'back'
        )
      },
      self.context
    )
    self.actionButtonsContainerView.addSubview(buttonView)
  }

  _setup_actionButton_createNewWallet () {
    const self = this
    const buttonView = commonComponents_actionButtons.New_ActionButtonView(
      'Create new wallet',
      null, // no image
      true,
      function (layer, e) {
        self.wizardController.PatchToDifferentWizardTaskMode_byPushingScreen(
          self.wizardController.WizardTask_Mode_AfterPick_CreateWallet(),
          1 // first screen after 0 - maintain ability to hit 'back'
        )
      },
      self.context,
      undefined,
      'blue'
    )
    self.actionButtonsContainerView.addSubview(buttonView)
  }

  _setup_startObserving () {
    const self = this
    super._setup_startObserving()
  }

  //
  //
  // Lifecycle - Teardown
  //
  TearDown () {
    const self = this
    super.TearDown()
  }

  //
  //
  // Runtime - Accessors - Navigation
  //
  Navigation_Title () {
    return 'Add Wallet'
  }

  Navigation_New_LeftBarButtonView () {
    const self = this
    const view = commonComponents_navigationBarButtons.New_LeftSide_CancelButtonView(self.context)
    const layer = view.layer
    { // observe
      layer.addEventListener(
        'click',
        function (e) {
          e.preventDefault()
          self.wizardController._fromScreen_userPickedCancel()
          return false
        }
      )
    }
    return view
  }
  //
  //
  // Runtime - Imperatives -
  //
}
export default PickCreateOrUseExisting_Landing_View
