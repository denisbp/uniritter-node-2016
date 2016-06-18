using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using TechTalk.SpecFlow;
using UniRitter.UniRitter2016.Models;

namespace UniRitter.UniRitter2016.Specs
{
    [Binding]
    public class HealthCheckAPISteps
    {
        private readonly HttpClient client;
        private string path;
        private HttpResponseMessage response;

        public HealthCheckAPISteps()
        {
            //todo: refactor this into a helper
            client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:49556/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        [Given(@"I have a running, healthy API")]
        public void GivenIHaveARunningHealthyAPI()
        {
            //nothing to do here -- startup hook will guarantee the API is up and running
        }
        
        [When(@"perform a GET against the /healthcheck endpoint")]
        public void WhenPerformAGETAgainstTheHealthcheckEndpoint()
        {
            response = client.GetAsync("healthcheck").Result;
        }
        
        [Then(@"I receive a (.*) status code")]
        public void ThenIReceiveAStatusCode(int statusCode)
        {
            Assert.That(response.StatusCode, Is.EqualTo((HttpStatusCode)statusCode));
        }
        
        [Then(@"a payload containing a '(.*)' status")]
        public void ThenAPayloadContainingAStatus(string p0)
        {
            var body = response.Content.ReadAsAsync<HealthCheck>().Result;
            Assert.That(body.status, Is.EqualTo(HealthStatus.green));
        }
    }
}
