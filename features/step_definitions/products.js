module.exports = function () {
    const 
        _ = require('lodash'),
        chai = require('chai'),
        expect = chai.expect;
        
    this.Given(/^a valid product$/, function () {
        this.payload = {
            data: {
                type: 'products',
                attributes: {
                    name: 'Test Product', 
                    price: 100
                }
            }
        }
    });
    
   this.Then(/^the new product id$/, function () {
        expect(this.response.body.data.id).not.to.be.undefined;
        expect(this.response.body.data.id).to.not.empty;
   });
   
   this.Given(/^an invalid product that is missing the name$/, function () {
        this.payload = require('../fixtures/products-invalid-name')
    });
    
    this.Given(/^an invalid product that has a negative price$/, function () {
        this.payload = require('../fixtures/products-invalid-price')
    });
}