'use strict'

class FilesystemUI_Abstract {
  constructor (options, context) {
    const self = this
    {
      self.options = options
      self.context = context
    }
  }

  //
  //
  // Runtime - Imperatives - Dialogs - Save
  //
  PresentDialogToSaveBase64ImageStringAsImageFile (
    imgData_base64String,
    fn // (err?) -> Void
  ) {
    const self = this
    const errStr = 'Override PresentDialogToSaveBase64ImageStringAsImageFile in ' + self.constructor.name
    fn(new Error(errStr))
    throw errStr // to break development builds
  }

  PresentDialogToSaveTextFile (
    contentString,
    title,
    defaultFilename_sansExt,
    ext,
    fn,
    optl_uriContentPrefix // this can be undefined for electron since we're saving the file directly
  ) {
    const self = this
    const errStr = 'Override PresentDialogToSaveTextFile in ' + self.constructor.name
    fn(new Error(errStr))
    throw errStr // to break development builds
  }

  //
  //
  // Runtime - Imperatives - Dialogs - Open
  //
  PresentDialogToOpenOneImageFile (
    fn // (err?, absoluteFilePath?) -> Void
  ) {
    const self = this
    const errStr = 'Override PresentDialogToOpenOneImageFile in ' + self.constructor.name
    fn(new Error(errStr))
    throw errStr // to break development builds
  }
}
export default FilesystemUI_Abstract
