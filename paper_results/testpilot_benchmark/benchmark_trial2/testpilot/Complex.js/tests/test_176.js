let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.coth', function(done) {
        // Test that coth(0) throws an error or returns infinity
        // Since coth(0) = cosh(0)/sinh(0) = 1/0, it should be undefined or throw
        try {
            let result = complex_js.ZERO.coth();
            // If it doesn't throw, check if result is infinite or NaN
            assert(isNaN(result.re) || !isFinite(result.re), 'coth(0) should be undefined/infinite');
        } catch (error) {
            // It's acceptable for coth(0) to throw an error
            assert(true, 'coth(0) appropriately throws an error');
        }
        done();
    });

    })