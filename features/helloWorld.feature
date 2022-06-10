Feature: Hello World
  @IP1
  Scenario: Simple
    Given I make a POST request to /hello_world
    And I set body to helloWorld
    When I receive a response
    Then I expect response should have a status 200
    And I expect response body to have the following values
      | message | {{helloWorld.action}} {{helloWorld.to}} |
  @IP2
  Scenario: Test Rate Limit
    Given I make a POST request to /hello_world
    And I set body to helloWorld
    When I run it for 401 times
    Then I expect response should have a status 429

