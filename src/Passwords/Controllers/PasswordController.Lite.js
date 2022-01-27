'use strict'

import PasswordController_Base from './PasswordController_Base'

class PasswordController extends PasswordController_Base {
  setupAndBoot () {
    const self = this
    setTimeout( // for effect / simulated synchronization
      function () {
        self.hasUserSavedAPassword = true
        self.password = 'totally arbitrary'
        self.userSelectedTypeOfPassword = self.AvailableUserSelectableTypesOfPassword().FreeformStringPW
        self._setBooted() // all done! call waiting fns
      },
      1
    )
  }

  //
  // Runtime - Accessors - Overrides
  HasUserEnteredValidPasswordYet () {
    return true
  }

  IsUserChangingPassword () {
    return false
  }

  _new_incorrectPasswordValidationErrorMessageString () {
    throw 'Not available'
  }

  //
  // Runtime - Imperatives - Public - Overrides
  WhenBootedAndPasswordObtained_PasswordAndType (
    fn, // (password, passwordType) -> Void
    optl__userDidCancel_fn
  ) { // this function is for convenience to wrap consumers' waiting for password readiness
    const userDidCancel_fn = optl__userDidCancel_fn || function () {}
    const self = this
    // we can just call back immediately
    setTimeout(
      function () {
        fn(self.password, self.userSelectedTypeOfPassword)
      }, 1
    )
  }

  OnceBooted_GetNewPasswordAndTypeOrExistingPasswordFromUserAndEmitIt () {
    throw 'Not available'
  }

  Initiate_ChangePassword () {
    throw 'Not available'
  }

  Initiate_VerifyUserAuthenticationForAction (
    customNavigationBarTitle_orNull, // String? -- null if you don't want one
    canceled_fn, // () -> Void
    entryAttempt_succeeded_fn // () -> Void
  ) {
    entryAttempt_succeeded_fn() // rather than not implementing this in Lite mode, just going to return immediately - it's more convenient for app objects to be coded as if it exists
  }

  //
  // Runtime - Imperatives - Private - Overrides
  _getUserToEnterTheirExistingPassword (isForChangePassword, isForAuthorizingAppActionOnly, customNavigationBarTitle_orNull, fn) {
    throw 'Not available'
  }

  _getUserToEnterNewPassword (isForChangePassword, fn) {
    throw 'Not available'
  }

  obtainNewPasswordFromUser (isForChangePassword) {
    throw 'Not available'
  }

  _executeWhenBooted (fn) {
    const self = this
    fn() // ready to execute
  }

  saveToDisk (fn) {
    throw 'Not available'
  }

  //
  // Runtime - Delegation - Overrides
  _didObtainPassword (password) {
    throw 'Not available'
  }

  _didBecomeIdleAfterHavingPreviouslyEnteredPassword () { // special functionality here - we want to clear /all/ persisted data (i.e. clear sessionData)
    const self = this
    // so we'll bypass super's implementation and just clear everything
    if (self.context.walletsListController.records.length > 0) { // normally this directionality of coupling would be bad but we're already saying this is the .Lite version
      self.InitiateDeleteEverything(
        function () {
          setTimeout(function () { // after timeout b/c we absolutely don't want to prevent the main thread from rendering its deleteeverything changes
            alert("You've been logged out due to inactivity.") // just going to assume this is a browser. 🤥
          }, 500) // and it's ok to give them a moment to visually process the change before popping explanatory alert
        }
      )
    }
  }
}
export default PasswordController
