Feature: HealthCheckAPI
	In order to know about API health and availability
	As an API client
	I want to access a simple API endpoint that provides me a health status

@integrated
Scenario: Check the healthcheck endpoint
	Given I have a running, healthy API
	When perform a GET against the /healthcheck endpoint
	Then I receive a 200 status code
	And a payload containing a 'green' status
