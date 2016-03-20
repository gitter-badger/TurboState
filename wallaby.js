module.exports = function (wallaby) {
  return {
    files: [
      {
        pattern: 'node_modules/babel-polyfill/dist/polyfill.js',
        instrument: false
      },
      'TurboState.js'
    ],

    tests: [
      'Tests.js'
    ],

    testFramework: 'mocha',

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    env: {
      type: 'node'
      // More options are described here
      // http://wallabyjs.com/docs/integration/node.html
    }
  };
};
