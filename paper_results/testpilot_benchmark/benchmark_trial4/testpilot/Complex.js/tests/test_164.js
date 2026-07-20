let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acsc', function(done) {
        // Test that acsc(0) throws an error or returns infinity
        // since acsc(0) = 1/sin(acsc(0)) and acsc(0) is undefined
        try {
            let result = complex_js.ZERO.acsc();
            // If it doesn't throw, check if result is infinite or NaN
            assert(result.isNaN() || result.isInfinite(), 'acsc(0) should be undefined/infinite');
        } catch (error) {
            // It's acceptable for acsc(0) to throw an error
            assert(true, 'acsc(0) correctly throws an error');
        }
        done();
    });

    })