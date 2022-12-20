module.exports = {
  reporter: 'mochawesome',
  html: false,
  json: true,
  chromeWebSecurity: false,
  screenshotOnRunFailure: false,
  video: false,
  e2e: {
    setupNodeEvents(on, config) {},
  },
}
