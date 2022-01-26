'use strict'

import View from '../Views/View.web'
import Views__cssRules from '../Views/cssRules.web'

const k_transitionTime = 0.2
const k_height = 12
const k_width = k_height * 2
const k_knobHeight = k_height - 4
const k_knobWidth = k_height - 4
const k_backgroundColor = '#1D1B1D'
const k_backgroundColorChecked = '#1D1B1D'
const k_knobColor = '#333638'
const k_knobColorChecked = '#00C6FF'
//
// CSS rules
const NamespaceName = 'switchToggles'
const haveCSSRulesBeenInjected_documentKey = '__haveCSSRulesBeenInjected_' + NamespaceName
const cssRules =
[
	`.switch {
		display: flex;
		justify-content: space-between;
		padding: 13px 0px 13px 8px;
		cursor: pointer;
	}`,
	`.switch.border {
		border-bottom: 1px solid #383638;
	}`,
	`.switch .note {
		align-self: flex-start;
		color: #8D8B8D;
	}`,
	`.switch .toggle {
		visibility: hidden;
		position: absolute;
		margin-left: -9999px;
	}`,
	`.switch input.toggle+label {
		align-self: flex-end;
		height: ${k_height}px;
		width:  ${k_width}px;
		background-color: ${k_backgroundColor};
		box-shadow: 0 0.5px 0 0 rgba(56,54,56,0.5), inset 0 0.5px 0 0 #161416;
		border-radius: 100px;
		transition: background ${k_transitionTime}s;
		display: block;
		position: relative;
		outline: none;
		cursor: pointer;
	}`,
	`.switch input.toggle:checked+label {
		background-color: ${k_backgroundColorChecked};
	}`,
	`.switch input.toggle+label:before {
		height: ${k_height}px;
		width: ${k_width}px;
		background-color: ${k_backgroundColor};
		border-radius: 100px;
		transition: background ${k_transitionTime}s;
	}`,
	`.switch input.toggle:checked+label:before {
		background-color: ${k_backgroundColorChecked};
	}`,
	`.switch input.toggle+label:after {
		top: 2px;
		left: 2px;
		bottom: 2px;
		height: ${k_knobHeight}px;
		width:  ${k_knobWidth}px;
		background-color: ${k_knobColor}; 
		box-shadow: 0 0.5px 1px 0 #161416, inset 0 0.5px 0 0 #494749;
		border-radius: 21px;
		transition: transform ${k_transitionTime}s, background ${k_transitionTime}s;
	}`,
	`.switch input.toggle:checked+label:after {
		transform: translateX(${k_width - k_height}px);
		background-color: ${k_knobColorChecked};
		box-shadow: inset 0 0 0 0 rgba(255,255,255,0.2); 
		transition: transform ${k_transitionTime}s, background ${k_transitionTime}s;
	}`,
	`.switch input.toggle+label:before, .switch input.toggle+label:after {
		display: block;
		position: absolute;
		content: "";
	}`,
	`.switch.disabled {
		cursor: default;
	}`,
	`.switch.disabled label {
		opacity: 0.5;
	}`
]
function __injectCSSRules_ifNecessary () {
  Views__cssRules.InjectCSSRules_ifNecessary(haveCSSRulesBeenInjected_documentKey, cssRules)
}
//
function New_fieldValue_switchToggleView (params, context) {
  __injectCSSRules_ifNecessary()

  const note = params.note || 'note'
  const checked = params.checked == true
  const border = params.border
  const changed_fn = params.changed_fn || function (isChecked) {}
  const shouldToggle_fn = params.shouldToggle_fn || function (to_isSelected, async_shouldToggle_fn) { async_shouldToggle_fn(true) }

  const view = new View({ tag: 'div' }, context)
  const containerLayer = view.layer
  containerLayer.className = 'switch'
  containerLayer.className += border ? ' border' : ''

  const noteDiv = document.createElement('span')
  noteDiv.className = 'note'
  noteDiv.style.fontSize = '11px' // we need this to visually stand out slightly more given how it's used
  noteDiv.style.fontFamily = 'Native-Regular, input, menlo, monospace'
  noteDiv.style.fontWeight = 'lighter'
  noteDiv.innerHTML = note
  containerLayer.appendChild(noteDiv)

  const input = document.createElement('input')
  input.className = 'toggle'
  input.type = 'checkbox'
  input.checked = checked
  containerLayer.appendChild(input)

  const label = document.createElement('label')
  label.for = input.id
  containerLayer.appendChild(label)
  //
  view.isChecked = function () {
    return input.checked == true
  }
  view.setChecked = function (checked, squelch_changed_fn_emit, setWithoutShouldToggle) {
    function __really_toggle () {
      const normalized__currentValue = input.checked == true // for comparison
      const normalized__toValue = checked == true
      if (normalized__currentValue != normalized__toValue) {
        input.checked = normalized__toValue
        //
        if (squelch_changed_fn_emit != true) {
          changed_fn(checked)
        }
      }
    }
    if (setWithoutShouldToggle) {
      __really_toggle()
    } else {
      setTimeout(function () { // on 'next tick' so any consumers' animations remain smooth
        shouldToggle_fn( // enable consumer to disallow toggle
          checked,
          function (shouldToggle) {
            if (shouldToggle) {
              __really_toggle()
            }
          }
        )
      })
    }
  }
  view.toggleChecked = function (squelch_changed_fn_emit) {
    view.setChecked(!input.checked, squelch_changed_fn_emit)
  }
  view.SetEnabled = function (isEnabled) {
    input.disabled = isEnabled ? undefined : true
    if (isEnabled) {
      containerLayer.classList.remove('disabled')
    } else {
      containerLayer.classList.add('disabled')
    }
  }
  //
  containerLayer.onclick = function () {
    if (input.disabled == true) {
      return // must manually guard on this as toggleChecked / setChecked bypass interactivity
    }
    view.toggleChecked(false/*do not squelch emit */)
  }
  input.addEventListener(
    'click',
    function (e) {
      // prevent any automatic checking/unchecking
      e.preventDefault()
      e.stopPropagation()
      //
      // this is done so as to gain the ability to programmatically mediate checking
      view.toggleChecked(false/*do not squelch emit */)
    }
  )

  return view
}
export default { New_fieldValue_switchToggleView }
