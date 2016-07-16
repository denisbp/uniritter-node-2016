module.exports = function () {
    const 
        _ = require('lodash'),
        chai = require('chai'),
        expect = chai.expect;

    this.Given(/^an existing order with a new status$/, function () {
        const 
            that = this,
            payload = {
            data: {
                type: 'orders',
                attributes: {
                    items: [{ product_id: '598b04ea-8c20-4240-9c2b-1d36350a8d33', quantity: 1}]
                    }
                }
            }
        

        return this.doHttpRequest('orders', 'post', payload)
        .then((response) => {
            that.existingOrder = response.body;
            return response;
        });
    });
    
    this.When(/^I search this order$/, function () {
        const 
            that = this,
            id = this.existingOrder.data.id;
        return this.doHttpRequest('orders/' + id, 'get', undefined)
        .then((response) => {
            that.responseBody = JSON.parse(response.body);
            return response;
        });
    });
    
    this.Then(/^I receive the order data$/, function () {
        expect(this.responseBody.data).not.to.be.undefined;
    });
    
    this.Then(/^its status is (.*)$/, function (status) {
        expect(this.responseBody.data.attributes.status).to.equal(status);
    });
    
<<<<<<< HEAD
    this.Given(/^a valid order$/, function () {
        this.payload = {
            data: {
                type: 'orders',
                attributes: {
                    items: [{ product_id: '598b04ea-8c20-4240-9c2b-1d36350a8d33', quantity: 1}]
                }
            }
        }
    });
    
    this.When(/^I submit it to the API$/, function () {
        const
            that = this;
        return this.doHttpRequest('orders', 'post', this.payload)
        .then((response) => {
            that.response = response;
            return response;
        });
   });
   
   this.Then(/^I receive a success message$/, function () {
        expect(this.response.statusCode).to.equal(201);
   });
   
   this.Then(/^the new order id$/, function () {
        expect(this.response.body.data.id).not.to.be.undefined;
        expect(this.response.body.data.id).to.not.empty;
   });
=======
    this.Then(/^wait a few seconds$/, function (callback) {
        setTimeout(callback, 3000);
    });
    
>>>>>>> upstream/master
}
