'use strict'

function InjectCSSRules_ifNecessary (
  haveCSSRulesBeenInjected_documentKey,
  cssRules__orGeneratorFn,
  context__orNil
) {
  if (document[haveCSSRulesBeenInjected_documentKey] !== true) {
    let cssRules
		if (typeof cssRules__orGeneratorFn === 'function') {
      cssRules = cssRules__orGeneratorFn(context__orNil)
    } else {
      cssRules = cssRules__orGeneratorFn
    }
    //
    const reversed_cssRules = cssRules.reverse()
    reversed_cssRules.forEach(
      function (cssRuleString, i) {
        try {
          document.styleSheets[0].insertRule(cssRuleString, 0)
        } catch (e) {
          console.warn('Unable to insert rule: ', cssRuleString)
        }
      }
    )
    document[haveCSSRulesBeenInjected_documentKey] = true
  }
}
//
function InjectCSSFile_ifNecessary (stylesheetHref) {
  const key = 'hasCSSFileBeenInjected_' + stylesheetHref
  if (document[key] !== true) {
    let head = document.getElementsByTagName('head')[0]
    let link = document.createElement('link')
    link.id = key
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = stylesheetHref
    link.media = 'all'
    head.appendChild(link)
    //
    document[key] = true
  }
}
//
function InjectCSSFiles_ifNecessary (
  stylesheetHrefs__orGeneratorFn,
  context__orNil
) {
  let stylesheetHrefs
	if (typeof stylesheetHrefs__orGeneratorFn === 'function') {
    stylesheetHrefs = stylesheetHrefs__orGeneratorFn(context__orNil)
  } else {
    stylesheetHrefs = stylesheetHrefs__orGeneratorFn
  }
  //
  const numberOf_stylesheetHrefs = stylesheetHrefs.length
  for (let i = 0; i < numberOf_stylesheetHrefs; i++) {
    const stylesheetHref = stylesheetHrefs[i]
    InjectCSSFile_ifNecessary(stylesheetHref)
  }
}
const obj = { InjectCSSRules_ifNecessary, InjectCSSFile_ifNecessary, InjectCSSFiles_ifNecessary }
export default obj
