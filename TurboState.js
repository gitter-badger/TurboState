;(function () {
  /**
   * @namespace TurboState
  */
  var TurboState = {
    turbocharge: function turbocharge () {
      return true
    }
  }

  //
  // export library
  //
  if (typeof module === 'object') {
    module.exports = TurboState
  } else if (typeof exports === 'object') {
    exports.TurboState = TurboState
  } else if (typeof window === 'object') {
    window.TurboState = TurboState
  }
}())
