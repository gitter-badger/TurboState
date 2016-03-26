var baseconf = require('./karma.base.conf')

module.exports = function (config) {
  config.set(Object.assign({}, baseconf, {

    customLaunchers: {
      bs_edge_win: {
        base: 'BrowserStack',
        browser: 'edge',
        browser_version: '13',
        os: 'Windows',
        os_version: '10'
      },
      // bs_safari_mac: {
      //   base: 'BrowserStack',
      //   browser: 'safari',
      //   browser_version: '9',
      //   os: 'OS X',
      //   os_version: 'El Capitan'
      // }
    },

    browsers: ['bs_edge_win'] //, 'bs_safari_mac']

  }))
}
