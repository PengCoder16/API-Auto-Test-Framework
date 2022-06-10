Feature: Disbursement
  In order to keep Disbursement api stable
  As a tester
  I want to make sure that everything works as expected

  @disbursement
  Scenario: Create A Valid Disbursement
    Given I make a Post request to /disbursements
    And I set body to disbursement
    When I receive a response
    Then I expect response should have a status 200
  @get_disbursement
  Scenario: Get Disbursement With External_ID
    Given I make a Get request to /disbursements/external_id={external_id}
    And I set path param external_id to disb-1475459775872
    When I receive a response
    Then I expect response should have a status 200

  @rate_limiter
  Scenario: Create Valid Request
    Given I make a Post request to /hello_world
    And I set body to rate_limiter
    When I receive a response
    Then I expect response should have a status 200

