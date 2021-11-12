'use strict'

import ListCellView from '../../Lists/Views/ListCellView.web'
import commonComponents_tables from '../../MMAppUICommonComponents/tables.web'
import commonComponents_hoverableCells from '../../MMAppUICommonComponents/hoverableCells.web'
import FundsRequestCellContentsView from './FundsRequestCellContentsView.web'

class FundsRequestsListCellView extends ListCellView {
  setup_views () {
    const self = this
    { // self.cellContentsView: set this up /before/ calling _cmd on super
      // so that it's avail in overridable_layerToObserveForTaps
      const view = new FundsRequestCellContentsView({}, self.context)
      self.cellContentsView = view
      // though this `add…` could be deferred til after…
      self.addSubview(view)
    }
    super.setup_views()
    {
      const layer = self.layer
      layer.style.position = 'relative'
      // hover effects/classes
      self.layer.classList.add(commonComponents_hoverableCells.ClassFor_HoverableCell())
      self.layer.classList.add(commonComponents_hoverableCells.ClassFor_GreyCell())
    }
    {
      const layer = commonComponents_tables.New_tableCell_accessoryChevronLayer(self.context)
      self.layer.appendChild(layer)
    }
    self.__setup_cellSeparatorLayer()
  }

  overridable_layerToObserveForTaps () {
    const self = this
    if (!self.cellContentsView || typeof self.cellContentsView === 'undefined') {
      throw 'self.cellContentsView was nil in ' + self.constructor.name + ' overridable_layerToObserveForTaps'
      // return self.layer
    }
    return self.cellContentsView.layer
  }

  __setup_cellSeparatorLayer () {
    const self = this
    const layer = commonComponents_tables.New_tableCell_separatorLayer()
    self.cellSeparatorLayer = layer
    self.layer.appendChild(layer)
  }

  //
  //
  // Lifecycle - Teardown/Recycling
  //
  TearDown () {
    super.TearDown()
    const self = this
    self.cellContentsView.TearDown()
  }

  prepareForReuse () {
    super.prepareForReuse()
    const self = this
    self.cellContentsView.PrepareForReuse()
  }

  //
  //
  // Runtime - Imperatives - Cell view - Config with record
  //
  overridable_configureUIWithRecord () {
    super.overridable_configureUIWithRecord()
    //
    const self = this
    {
      if (self.isAtEnd == true) {
        self.cellSeparatorLayer.style.visibility = 'hidden'
      } else {
        self.cellSeparatorLayer.style.visibility = 'visible'
      }
    }
    self.cellContentsView.ConfigureWithRecord(self.record)
  }
}
export default FundsRequestsListCellView
