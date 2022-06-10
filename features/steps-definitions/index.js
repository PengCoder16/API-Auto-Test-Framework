const pactum = require('pactum');
const requestBodies = require("../request-body");
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const Mustache = require('mustache');

let spec = pactum.spec();

Before(() => {
  spec = pactum.spec();
});

Given(/^I make a (.*) request to (.*)$/, function (method, endpoint) {
    spec[method.toLowerCase()](endpoint);
  });

Given(/I set body to (.+)$/, function (requestBodyKey) {
  try {
    spec.withJson(JSON.parse(requestBodies[requestBodyKey]));
  } catch(error) {
    spec.withBody(requestBodies[requestBodyKey]);
  }
});

When('I receive a response', async function () {
  await spec.toss();
});

When('I run it for {int} times', async function(count) {
  await Promise.all([...Array(count).keys()].map(key => spec.toss()));
});
  
Then('I expect response should have a status {int}', function (code) {
  spec.response().should.have.status(code);
});

Then('I expect response body to have the following values', function (table) {
  const tableHash = table.rowsHash()

  Object.keys(tableHash).map(key => {
    const val = tableHash[key];

    spec.expectJson(key, Mustache.render(val, requestBodies));
  })
});