'use strict'

import View from '../../Views/View.web'
import ListView from '../../Lists/Views/ListView.web'
import commonComponents_navigationBarButtons from '../../MMAppUICommonComponents/navigationBarButtons.web'
import commonComponents_emptyScreens from '../../MMAppUICommonComponents/emptyScreens.web'
import ContactsListCellView from './ContactsListCellView.web'
import ContactDetailsView from './ContactDetailsView.web'
import AddContactFromContactsTabView from './AddContactFromContactsTabView.web'
import StackAndModalNavigationView from '../../StackNavigation/Views/StackAndModalNavigationView.web'

class ContactsListView extends ListView {
  constructor (options, context) {
    options.listController = context.contactsListController
    // ^- injecting dep so consumer of self doesn't have to
    super(options, context)
    self.currentlyPresented_AddContactView = null // zeroing
  }

  overridable_listCellViewClass () { // override and return youir
    return ContactsListCellView
  }

  overridable_pushesDetailsViewOnCellTap () {
    return true
  }

  overridable_recordDetailsViewClass (record) {
    return ContactDetailsView
  }

  _setup_views () {
    const self = this
    super._setup_views()
    self._setup_emptyStateContainerView()
  }

  _setup_emptyStateContainerView () {
    const self = this
    const view = new View({}, self.context)
    self.emptyStateContainerView = view
    const layer = view.layer
    const margin_side = 16
    const marginTop = 56 - 41 // TODO: do this in VDA and query actual nav bar height
    const marginBottom = 14
    layer.style.marginTop = `${marginTop}px`
    layer.style.marginLeft = margin_side + 'px'
    layer.style.width = `calc(100% - ${2 * margin_side}px)`
    layer.style.height = `calc(100% - ${marginTop + marginBottom}px)`
    {
      const emptyStateMessageContainerView = commonComponents_emptyScreens.New_EmptyStateMessageContainerView(
        '😬',
        "You haven't created any<br/>contacts yet.",
        self.context,
        0,
        0
      )
      self.emptyStateMessageContainerView = emptyStateMessageContainerView
      view.addSubview(emptyStateMessageContainerView)
    }
    view.SetVisible = function (isVisible) {
      view.isVisible = isVisible
      if (isVisible) {
        if (layer.style.display !== 'block') {
          layer.style.display = 'block'
        }
      } else {
        if (layer.style.display !== 'none') {
          layer.style.display = 'none'
        }
      }
    }
    view.SetVisible(false)
    self.addSubview(view)
  }

  //
  tearDownAnySpawnedReferencedPresentedViews () { // overridden - called for us
    const self = this
    super.tearDownAnySpawnedReferencedPresentedViews()
    self._teardown_currentlyPresented_AddContactView()
  }

  _teardown_currentlyPresented_AddContactView () {
    const self = this
    // … is this sufficient? might need/want to tear down the stack nav too?
    if (self.currentlyPresented_AddContactView !== null && typeof self.currentlyPresented_AddContactView !== 'undefined') {
      self.currentlyPresented_AddContactView.TearDown() // might not be necessary but method guards itself
      self.currentlyPresented_AddContactView = null // must zero again and should free
    }
  }

  //
  //
  // Runtime - Accessors - Navigation
  //
  Navigation_Title () {
    return 'Contacts'
  }

  Navigation_New_RightBarButtonView () {
    const self = this
    //
    const view = commonComponents_navigationBarButtons.New_RightSide_AddButtonView(self.context)
    view.layer.addEventListener(
      'click',
      function (e) {
        e.preventDefault()
        //
        if (self.navigationController.isCurrentlyTransitioningAManagedView__Modal == true) {
          console.warn('Ignoring ix on rightBarButtonView while self.navigationController.isCurrentlyTransitioningAManagedView__Modal=true')
          return
        }
        //
        const view = new AddContactFromContactsTabView({}, self.context)
        self.currentlyPresented_AddContactView = view
        const navigationView = new StackAndModalNavigationView({}, self.context)
        navigationView.SetStackViews([view])
        self.navigationController.PresentView(navigationView, true)
        //
        return false
      }
    )
    return view
  }

  //
  //
  // Runtime - Delegation - UI building
  //
  overridable_willBuildUIWithRecords (records) {
    super.overridable_willBuildUIWithRecords(records)
    //
    const self = this
    // v--- we don't need this here as at present according to design the buttons don't change… just stays the 'Add' btn
    // self.navigationController.SetNavigationBarButtonsNeedsUpdate()
    const isEmptyVisible = records.length === 0 && (self.context.passwordController.hasUserSavedAPassword == false || self.context.passwordController.HasUserEnteredValidPasswordYet())
    // ^-- passwordController state checked to avoid improperly showing empty screen when no records loaded but pw not yet entered
    {
      self.emptyStateContainerView.SetVisible(isEmptyVisible)
    }
    { // style cellsContainerView
      const view = self.cellsContainerView
      const layer = view.layer
      if (isEmptyVisible == true) {
        layer.style.display = 'none'
      } else {
        layer.style.margin = '16px'
        layer.style.background = '#383638'
        layer.style.boxShadow = 'inset 0 0.5px 0 0 #494749'
        layer.style.borderRadius = '5px'
        layer.style.boxSizing = 'border-box'
        layer.style.overflow = 'hidden' // to cut off hover style at borders
        layer.style.clipPath = 'inset(0 0 0 0 round 5px)' // cause chrome to properly mask children on hover
      }
    }
  }
}
export default ContactsListView
