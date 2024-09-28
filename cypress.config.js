const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.gamesforthebrain.com',
    setupNodeEvents(on, config) {
      return config
    },
  },
  env: {
    baseUrl2: 'https://deckofcardsapi.com/',
  },
})
