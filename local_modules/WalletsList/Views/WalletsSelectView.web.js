'use strict'

import Views__cssRules from '../../Views/cssRules.web'
import ListCustomSelectView from '../../Lists/Views/ListCustomSelectView.web'
import WalletCellContentsView from '../../Wallets/Views/WalletCellContentsView.web'
import commonComponents_walletIcons from '../../MMAppUICommonComponents/walletIcons.web'

const NamespaceName = 'WalletSelectView'
const haveCSSRulesBeenInjected_documentKey = '__haveCSSRulesBeenInjected_' + NamespaceName
const cssRules =
[
	`.${NamespaceName} {
		display: block; /* own line */
		outline: none; /* no focus ring */

		height: 66px;
		width: 100%;
		padding: 0;
		box-sizing: border-box;

		appearance: none;
		background: #383638;
		border-width: 0;
		box-shadow: 0 0.5px 1px 0 #161416, inset 0 0.5px 0 0 #494749;
		border-radius: 5px;

		text-align: left;
		font-size: 14px;
		color: #FCFBFC;
	}`,
	`.${NamespaceName} .selectionDisplayCellView,
	 .${NamespaceName} .options_containerView {
		border-radius: 5px;
		overflow: hidden;
	}`,
	`.${NamespaceName} > .options_containerView {
		border-radius: 5px;
		box-shadow: 0 15px 12px 0 rgba(0,0,0,0.22), 0 19px 38px 0 rgba(0,0,0,0.30);
	}`,
	`.${NamespaceName} > .options_containerView > .background {
		background: #383638;
		border-radius: 5px;
		box-shadow: 0 0.5px 1px 0 #161416, inset 0 0.5px 0 0 #494749;
	}`,
	`.${NamespaceName} > .options_containerView .optionCell.active {
		background-color: rgba(73, 71, 73, 0.95) !important;
	}`
]
function __injectCSSRules_ifNecessary () { Views__cssRules.InjectCSSRules_ifNecessary(haveCSSRulesBeenInjected_documentKey, cssRules) }
//
function _fromContext_wantsHoverAndSelectable (context) {
  return true
}
//
class WalletsSelectView extends ListCustomSelectView {
  // Lifecycle - Setup
  constructor (options, context) {
    options = options || {}
    options.cellView_height_fn = function (selectView, cellView) { // must implement this (currently) so the CustomSelectView can avoid asking cells for their offsetHeight
      return 66
    }
    options.listController = context.walletsListController // must pass
    options.cellContentsViewClass = WalletCellContentsView // must pass
    options.cellContentsView_init_baseOptions = // optl but set here for things like icon_sizeClass
		{
		  icon_sizeClass: commonComponents_walletIcons.SizeClasses.Medium32,
		  wantsHoverable: _fromContext_wantsHoverAndSelectable(context),
		  wantsNoSecondaryBalances: true,
		  wantsOnlySpendableBalance: true // this could be changed to false for e.g. the creatfundsrequestform
		}
    super(options, context)
  }

  overridable_wantsSelectionDisplayCellView_clickable () {
    return _fromContext_wantsHoverAndSelectable(this.context)
	}

  setup_views () {
    __injectCSSRules_ifNecessary() // may as well do this here
    //
    const self = this
    {
      const layer = self.layer
      layer.classList.add(NamespaceName) // must add class for css rules
    }
    super.setup_views()
    {
      const layer = self.selectionDisplayCellView.layer
      layer.style.backgroundColor = 'none'
      layer.style.boxShadow = 'inset 0 0.5px 0 0 #494749'
    }
    {
      const layer = document.createElement('div')
      layer.style.position = 'absolute'
      layer.style.left = '0'
      layer.style.top = '0'
      layer.style.width = '100%'
      layer.style.height = '100%'
      layer.style.zIndex = '10' // below cells
      layer.className = 'background'
      self.options_containerView.layer.appendChild(layer)
    }
  }

  // Overrides
  overridable_maxNumberOfCellsToDisplayAtATime () { return 2.65 }
  overridable_setup_cellView (cellView, rowItem) {
    const self = this
    super.overridable_setup_cellView(cellView, rowItem)
    cellView.layer.backgroundColor = 'none' // so we can see the decoration around self.options_containerView/.bg
  }
}
export default WalletsSelectView
