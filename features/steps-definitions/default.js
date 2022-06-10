const { request, settings } = require('pactum');
const { Before } = require('@cucumber/cucumber');
require('dotenv').config()

Before(() => {
  request.setBaseUrl('https://api.xendit.co');
  request.setBasicAuth(process.env.AUTH_USERNAME, process.env.AUTH_PASSWORD)
  request.setDefaultTimeout(10000)
  settings.setReporterAutoRun(true);
});