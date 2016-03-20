module.exports = function (wallaby) {
  return {
    files: [
      {
        pattern: 'node_modules/babel-polyfill/dist/polyfill.js',
        instrument: false
      },
      'Library/TurboState.js'
    ],

    tests: [
      'Library/Tests.js'
    ],

    testFramework: 'mocha',

    compilers: {
      'Library/*.js': wallaby.compilers.babel()
    },

    env: {
      type: 'node'
      // More options are described here
      // http://wallabyjs.com/docs/integration/node.html
    }
  }
}
