'use strict'

import Currencies from '../CcyConversionRates/Currencies'

const new_selectLayer = function () {
  const selectLayer = document.createElement('select')
  const allCcySymbols = Currencies.allOrderedCurrencySymbols
  const numberOf_allCcySymbols = allCcySymbols.length
  for (let i = 0; i < numberOf_allCcySymbols; i++) {
    const ccySymbol = allCcySymbols[i]
    const optionLayer = document.createElement('option')
    optionLayer.style.textAlign = 'center'
    optionLayer.value = ccySymbol
    optionLayer.innerText = ccySymbol
    selectLayer.appendChild(optionLayer)
  }
  selectLayer.Component_selected_ccySymbol = function () { // v---- TODO: does this cause a retain cycle?
    return selectLayer.options[selectLayer.selectedIndex].value
  }
  //
  return selectLayer
}

export default { new_selectLayer }
