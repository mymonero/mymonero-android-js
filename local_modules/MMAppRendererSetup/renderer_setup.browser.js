'use strict'

import renderer_setup_utils from './renderer_setup_utils'

const obj = function (params) {
  params = params || {}
  //
  renderer_setup_utils.HardenRuntime({
    isBrowserBuild: true
  })
  renderer_setup_utils.IdentifyRuntime('IsBrowserRendererProcess') // set key-value to `true` on `window` -- not really using this under Cordova
}
//
export default obj
