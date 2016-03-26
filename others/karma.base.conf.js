var path = require('path')

module.exports = {

  basePath: '../',

  browsers: ['Electron'],

  coverageReporter: {

    dir: 'coverage',

    reporters: [
      { type: 'text' },
      { type: 'lcov', subdir: 'report-lcov' }
    ],

    check: {
      global: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      }
    }

  },

  frameworks: ['jasmine'],

  files: ['source/tests.js'],

  preprocessors: {
    'source/tests.js': ['webpack']
  },

  reporters: ['progress', 'coverage'],

  singleRun: true,

  webpack: {
    module: {
      preLoaders: [
        // instrument only testing sources with Istanbul
        {
          test: /\.js$/,
          include: path.resolve('source/turbostate.js'),
          loader: 'istanbul-instrumenter'
        }
      ]
    }
  },

  webpackMiddleware: {
    noInfo: true
  }

}
