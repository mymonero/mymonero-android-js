'use strict'

import uuidV1 from 'uuid/v1'
import View from '../Views/View.web'

const numberOfMnemonicWordsRequiredForVerification = 7
//
function New_MnemonicTextDisplayView (mnemonicString, context) {
  //
  const view = new View({}, context)
  const layer = view.layer
  layer.className = 'mnemonic-container'
  const padding_v = 35
  layer.style.minHeight = `${128 - 2 * padding_v}px`
  layer.style.padding = `${padding_v}px 24px`
  layer.style.width = `calc(100% - ${2 * 16}px - ${2 * 1}px - ${2 * 24}px)`
  layer.style.wordBreak = 'break-word'
  layer.style.lineHeight = '20px'
  layer.style.fontSize = '13px'
  layer.style.marginBottom = '23px'
  layer.style.color = '#9e9c9e'
  layer.style.userSelect = 'all' // decided to allow copying
  layer.style.webkitUserSelect = 'all' // decided to allow copying
  layer.style.mozUserSelect = 'all' // decided to allow copying
  layer.style.msUserSelect = 'all' // decided to allow copying
  layer.style.fontFamily = 'Native-Regular, input, menlo, monospace'
  layer.innerHTML = mnemonicString
  //
  return view
}
//
function New_MnemonicConfirmation_SelectedWordsView (mnemonicString, context, didSelectWord_fn, didDeselectWord_fn) {
  //
  didSelectWord_fn = didSelectWord_fn || function (wordUUID) {}
  didDeselectWord_fn = didDeselectWord_fn || function (wordUUID) {}
  //
  const view = new View({}, context)
  {
    const layer = view.layer
    layer.className = 'mnemonic-container'
    const padding_v = 20 // instead of 24, because word elements have v margin of 4
    layer.style.minHeight = `${129 - 2 * padding_v}px`
    layer.style.padding = `${padding_v}px 24px`
    layer.style.width = `calc(100% - ${2 * 16}px - ${2 * 1}px - ${2 * 24}px)`
    layer.style.textAlign = 'center'
  }
  // const all_mnemonicWords = mnemonicString.split(" ")
  // const necessary_mnemonicWords = all_mnemonicWords.slice(0, 6)
  const ordered_selectedWordUUIDs = []
  view.Component_SelectedWords = function () { // this is a little circuitous but seems the price for soloing the uuid-word mapping in the selectableWordsView
    return view.mnemonicConfirmation_selectableWordsView.Component_WordsFromUUIDs(ordered_selectedWordUUIDs)
  }
  const selectedWord_viewsByWordUUID = {}
  // Component - Methods - Setup - Imperatives
  view.Component_ConfigureWith_selectableWordsView = function (mnemonicConfirmation_selectableWordsView) {
    view.mnemonicConfirmation_selectableWordsView = mnemonicConfirmation_selectableWordsView
  }
  // Component - Methods - Teardown - Imperatives
  view.TearDown = function () {
    view.mnemonicConfirmation_selectableWordsView = null
  }
  // Component - Methods - Runtime - Imperatives
  view.Component_SelectWordWithUUID = function (word, wordUUID) {
    if (view.isEnabled == false) {
      console.warn('Selected but not enabled')
      return
    }
    ordered_selectedWordUUIDs.push(wordUUID)
    //
    const wordView = _new_MnemonicConfirmation_WordView(word, wordUUID, context)
    const wordView_layer = wordView.layer
    wordView_layer.addEventListener(
      'click',
      function (e) {
        e.preventDefault()
        if (view.isEnabled == false) {
          console.warn('Word deselected but control not enabled')
          return
        }
        const this_wordView_layer = this
        this_wordView_layer.href = '' // no longer clickable
        const wordUUID = this_wordView_layer.__component_mnemonicWordUUID
        if (!wordUUID || typeof wordUUID === 'undefined') {
          throw 'No word id associated with clicked layer'
        }
        view.Component_DeselectWordWithUUID(wordUUID)
        return false
      }
    )
    selectedWord_viewsByWordUUID[wordUUID] = wordView
    view.layer.appendChild(wordView_layer)
    //
    didSelectWord_fn(wordUUID)
  }
  view.Component_DeselectWordWithUUID = function (wordUUID) {
    {
      const indexOf_wordUUID = ordered_selectedWordUUIDs.indexOf(wordUUID)
      if (indexOf_wordUUID === -1) {
        throw 'WordUUID not found in list of selected words.'
      }
      ordered_selectedWordUUIDs.splice(indexOf_wordUUID, 1) // remove
    }
    {
      const wordView = selectedWord_viewsByWordUUID[wordUUID]
      const wordView_layer = wordView.layer
      delete selectedWord_viewsByWordUUID[wordUUID]
      view.layer.removeChild(wordView_layer)
      //
      view.mnemonicConfirmation_selectableWordsView.Component_WordWithUUIDWasDeselected(wordUUID)
      //
      didDeselectWord_fn(wordUUID)
    }
  }
  view.Component_DeselectAllWords = function () {
    const copyOf_ordered_selectedWordUUIDs = ordered_selectedWordUUIDs.slice()
    copyOf_ordered_selectedWordUUIDs.forEach(
      function (wordUUID, i) {
        view.Component_DeselectWordWithUUID(wordUUID)
      }
    )
  }
  view.Component_SetEnabled = function (isEnabled) {
    if (view.isEnabled == isEnabled) {
      console.warn('Already isEnabled', isEnabled)
      return
    }
    view.isEnabled = isEnabled
    const wordUUIDs = Object.keys(selectedWord_viewsByWordUUID)
    wordUUIDs.forEach(
      function (wordUUID, i) {
        const wordView = selectedWord_viewsByWordUUID[wordUUID]
        if (isEnabled == false) {
          wordView.layer.classList.add('disabled')
        } else {
          wordView.layer.classList.remove('disabled')
        }
      }
    )
  }
  //
  return view
}
//
function _new_MnemonicConfirmation_WordView (word, wordUUID, context) {
  const view = new View({ tag: 'a' }, context)
  const layer = view.layer
  layer.className = 'mnemonic-pill'
  layer.href = '#' // clickable by default
  layer.style.fontFamily = 'Native-Regular, input, menlo, monospace'
  layer.style.fontSize = '11px'
  layer.style.fontWeight = 'lighter'
  layer.ondragstart = function (e) { e.preventDefault(); return false } // disable link dragging
  layer.innerHTML = word.toUpperCase()
  { // for retrieval later
    layer.__component_mnemonicWord = word
    layer.__component_mnemonicWordUUID = wordUUID
  }
  return view
}
//
function New_MnemonicConfirmation_SelectableWordsView (
  mnemonicString,
  mnemonicConfirmation_selectedWordsView,
  context
) {
  const view = new View({}, context)
  {
    const layer = view.layer
    const padding_v = 24
    layer.style.padding = `${padding_v}px 24px`
    layer.style.width = `calc(100% - ${2 * 24}px)`
    layer.style.textAlign = 'center'
    layer.style.marginTop = '10px'
  }
  const mnemonicWords = mnemonicString.split(' ')
  const alphabetized_necessary_mnemonicWords = mnemonicWords.slice(0, numberOfMnemonicWordsRequiredForVerification).sort()

  const wordsByWordUUID = {} // because words are not unique in a mnemonic
  const wordViews_byWordUUID = {}
  alphabetized_necessary_mnemonicWords.forEach(
    function (word, i) {
      const wordUUID = _new_UUID()
      wordsByWordUUID[wordUUID] = word
      //
      const wordView = _new_MnemonicConfirmation_WordView(word, wordUUID, context)
      wordViews_byWordUUID[wordUUID] = wordView
      //
      const wordView_layer = wordView.layer
      view.layer.appendChild(wordView_layer)
      //
      wordView_layer.addEventListener(
        'click',
        function (e) {
          e.preventDefault()
          if (mnemonicConfirmation_selectedWordsView.isEnabled == false) {
            console.warn('Word selected but disabled.')
            return false
          }
          const this_wordView_layer = this
          const isSelectedClass = 'mnemonic-pill--selectedPlaceholder'
          if (this_wordView_layer.className === isSelectedClass) { // if it's already picked
            return
          }
          this_wordView_layer.className = isSelectedClass // flip to selected type
          this_wordView_layer.href = '' // no longer clickable
          const word = this_wordView_layer.__component_mnemonicWord
          if (!word || typeof word === 'undefined') {
            throw 'No word associated with clicked layer'
          }
          const wordUUID = this_wordView_layer.__component_mnemonicWordUUID
          if (!wordUUID || typeof wordUUID === 'undefined') {
            throw 'No word ID associated with clicked layer'
          }
          mnemonicConfirmation_selectedWordsView.Component_SelectWordWithUUID(word, wordUUID)
          //
          return false
        }
      )
    }
  )
  // Component - Methods - Teardown - Imperatives
  view.TearDown = function () { // nothing to do (yet)
  }
  // Component - Methods - Runtime - Accessors
  view.Component_WordsFromUUIDs = function (ordered_selectedWordUUIDs) {
    const words = []
    ordered_selectedWordUUIDs.forEach(
      function (wordUUID, i) {
        const word = wordsByWordUUID[wordUUID]
        if (typeof word === 'undefined' || !word) {
          throw 'Word not found for UUID'
          // return
        }
        words.push(word)
      }
    )
    return words
  }
  // Component - Methods - Runtime - Delegation
  view.Component_WordWithUUIDWasDeselected = function (wordUUID) {
    const wordView = wordViews_byWordUUID[wordUUID]
    const this_wordView_layer = wordView.layer
    this_wordView_layer.className = 'mnemonic-pill' // flip back to selectable type
    this_wordView_layer.href = '#' // clickable again
  }
  return view
}

//
function _new_UUID () {
  return uuidV1()
}

export default { numberOfMnemonicWordsRequiredForVerification, New_MnemonicTextDisplayView, New_MnemonicConfirmation_SelectedWordsView, New_MnemonicConfirmation_SelectableWordsView }
