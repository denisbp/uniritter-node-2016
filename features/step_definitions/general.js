module.exports = function () {
    const expect = require('chai').expect;
    
    this.Given(/^the system is up and running$/i,  function() {
        return this.server.then(function(server) {
            // checking the 'up' server flag
            expect(server.info.started).to.be.above(0);
            return server;
        });
    });
    
    this.When(/^I do a (\w+) against the \/(.*) endpoint$/, function (verb, endpoint) {
        var that = this;
        return this.doHttpRequest(endpoint, verb, null)
        .then(function (response) {
            that.response = response;
            return response;
        });
    });
    
    this.Then(/^I receive a (\d+) status code$/, function (statusCode) {
        expect(this.response.statusCode.toString()).to.equal(statusCode);
    });
       
    this.When(/^I (\w+) it against the \/(.*) endpoint$/, function (verb, endpoint) {
        var that = this;
        return this.doHttpRequest(endpoint, verb, that.fixture.request)
        .then(function (response) {
            that.response = response;
            return response;
        });
    });
    
    this.Then(/^a payload containing the newly created resource$/, function () {
        expect(this.response.body).to.containSubset(this.fixture.request);
    });    
    
    this.When(/^I submit it to the API$/, function () {
        const
            that = this;
        return this.doHttpRequest(this.payload.data.type, 'post', this.payload)
        .then((response) => {
            that.response = response;
            return response;
        })
        .catch(error => {
            that.error = error;
            return error;
        });
   });
   
   this.Then(/^I receive a success message$/, function () {
        expect(this.response.statusCode).to.equal(201);
   });
   
   this.Then(/^I receive an error response$/, function () {
        expect(this.response).to.be.undefined;
        expect(this.error.statusCode).not.to.be.undefined;
   });
   
   this.Then(/^a message saying that (.*)$/, function (message) {
        expect(message).to.contain(this.error.body.errors[0].message);
   });
};
