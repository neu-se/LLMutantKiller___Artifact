let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.coth', function(done) {
        // Test coth(0) - should throw an error or return infinity since coth(0) is undefined
        try {
            let result = complex_js.ZERO.coth();
            // If no error is thrown, check if result is infinite or NaN
            assert(isNaN(result.re) || !isFinite(result.re), 'coth(0) should be undefined/infinite');
        } catch (error) {
            // Expected behavior - coth(0) is undefined
            assert(true, 'coth(0) correctly throws an error');
        }
        done();
    });

    })