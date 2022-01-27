'use strict'

import emojione from './Vendor/emojione.min'

emojione.imageType = 'png' // png instead of svg as svg appear too slow to display en-masse
emojione.sprites = true

const emojiCategories =
[ // TODO/FIXME: source this from emojione
  { key: 'people', label: 'Smileys & People' },
  { key: 'nature', label: 'Animals & Nature' },
  { key: 'food', label: 'Food & Drink' },
  { key: 'activity', label: 'Activity' },
  { key: 'travel', label: 'Travel & Places' },
  { key: 'objects', label: 'Objects' },
  { key: 'symbols', label: 'Symbols' },
  { key: 'flags', label: 'Flags' }
]

function stylesheetPaths_generatorFn (context) {
  const stylesheetPaths =
	[
	  './src/Emoji/Vendor/emojione.min.css',
	  './src/Emoji/Vendor/emojione-sprite-32.min.css'
	]
  return stylesheetPaths
}
//
const cached_spritesheetImages = []
function PreLoadAndSetUpEmojiOne (context) { // ^ be sure to call this in order to inject the stylesheets

}
//
//
// Interface - Accessors - Transforms
//
function NativeEmojiTextToImageBackedEmojiText_orUnlessDisabled_NativeEmojiText (context, nativeEmojiText) {
  if (typeof nativeEmojiText !== 'string') { // to protect against numbers and such
    nativeEmojiText = '' + nativeEmojiText
  }
  const text = emojione.unicodeToImage(nativeEmojiText)
  //
  return text
}

function nativeEmojiTextToImageBackedEmojiText (nativeEmojiText) {
  if (typeof nativeEmojiText !== 'string') { // to protect against numbers and such
    nativeEmojiText = '' + nativeEmojiText
  }
  const text = emojione.unicodeToImage(nativeEmojiText)
  //
  return text
}

const obj = { PreLoadAndSetUpEmojiOne, NativeEmojiTextToImageBackedEmojiText_orUnlessDisabled_NativeEmojiText, stylesheetPaths_generatorFn, nativeEmojiTextToImageBackedEmojiText }

export default obj
