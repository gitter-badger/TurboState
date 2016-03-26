var wallabyWebpack = require('wallaby-webpack')
var wallabyPostprocessor = wallabyWebpack()

module.exports = function (wallaby) {
  return {
    files: [
      { pattern: 'source/turbostate.js', load: false }
    ],

    tests: [
      { pattern: 'source/tests.js', load: false }
    ],

    env: {
      kind: 'electron'
    },

    postprocessor: wallabyPostprocessor,

    setup: function () {
      // required to trigger test loading
      window.__moduleBundler.loadTests()
    }
  }
}
