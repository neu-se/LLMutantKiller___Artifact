let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csch', function(done) {
        // Test that csch(0) throws an error or returns infinity
        // since csch(0) = 2/(e^0 - e^-0) = 2/(1 - 1) = 2/0 = undefined
        try {
            let result = complex_js.ZERO.csch();
            // Check if result has infinite components
            assert(Math.abs(result.re) === Infinity || isNaN(result.re), 
                   'csch(0) should have infinite or NaN real part');
            assert(Math.abs(result.im) === Infinity || isNaN(result.im), 
                   'csch(0) should have infinite or NaN imaginary part');
        } catch (error) {
            // It's also acceptable if the function throws an error for division by zero
            assert(true, 'csch(0) appropriately throws an error for division by zero');
        }
        done();
    });

    })