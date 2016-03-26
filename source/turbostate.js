;(function () {
  /** @namespace TurboState */
  var TurboState = {}

  //
  // export library
  //
  /* istanbul ignore next */
  if (typeof module === 'object') {
    module.exports = TurboState
  } else if (typeof exports === 'object') {
    exports.TurboState = TurboState
  } else if (typeof window === 'object') {
    window.TurboState = TurboState
  }
}())
