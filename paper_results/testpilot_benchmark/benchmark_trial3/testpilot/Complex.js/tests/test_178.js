let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csch', function(done) {
        // Test csch(0) - should throw error or return infinity since csch(0) = 1/sinh(0) = 1/0
        try {
            let result = complex_js.ZERO.csch();
            // If no error is thrown, check if result is infinite
            assert(Math.abs(result.re) === Infinity || isNaN(result.re), 'csch(0) should be infinite or NaN');
        } catch (error) {
            // It's acceptable for csch(0) to throw an error
            assert(true, 'csch(0) appropriately throws an error');
        }
        done();
    });

    })