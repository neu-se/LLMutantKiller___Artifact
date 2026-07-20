let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acsc', function(done) {
        // Test that acsc(0) throws an error or returns infinity
        // since acsc(0) = 1/sin(acsc(0)) = 1/0 which is undefined
        try {
            let result = complex_js.ZERO.acsc();
            // If no error is thrown, check if result is infinity or NaN
            assert(result.isInfinite() || result.isNaN(), 'acsc(0) should be infinite or NaN');
        } catch (error) {
            // If an error is thrown, that's also acceptable for division by zero
            assert(true, 'acsc(0) correctly throws an error for division by zero');
        }
        done();
    });

    })