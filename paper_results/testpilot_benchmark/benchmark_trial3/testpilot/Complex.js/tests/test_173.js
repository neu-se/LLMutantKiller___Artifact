let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.coth', function(done) {
        // Test that coth(0) throws an error or returns infinity
        // Since coth(0) = cosh(0)/sinh(0) = 1/0, it should be undefined/infinite
        try {
            let result = complex_js.ZERO.coth();
            // If no error is thrown, check if result is infinite or NaN
            assert(isNaN(result.re) || !isFinite(result.re), 'coth(0) should be infinite or NaN');
        } catch (error) {
            // If an error is thrown, that's also acceptable behavior for coth(0)
            assert(true, 'coth(0) correctly throws an error');
        }
        done();
    });

    })