const { defineConfig } = require('cypress')

module.exports = defineConfig({
  //reporter: 'mochawesome',
  e2e: {
    baseUrl: 'https://www.gamesforthebrain.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    baseUrl2: 'https://deckofcardsapi.com/',
  },
})
