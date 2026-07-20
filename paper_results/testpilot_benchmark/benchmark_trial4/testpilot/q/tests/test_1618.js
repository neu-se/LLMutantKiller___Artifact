let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with context (this)', function(done) {
        // Create an object with a method
        const calculator = {
            multiplier: 10,
            multiply: function(value) {
                return this.multiplier * value;
            }
        };
        
        // Convert the method to a promised function
        const promisedMultiply = q.promised(calculator.multiply);
        
        // Call it with the calculator as context
        const result = promisedMultiply.call(calculator, q.resolve(5));
        
        result.then(function(product) {
            assert.equal(product, 50);
            done();
        }).catch(done);
    });
    
    })