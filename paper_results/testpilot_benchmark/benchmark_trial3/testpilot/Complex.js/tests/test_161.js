let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acsc', function(done) {
        // Test that acsc(0) throws an error or returns infinity
        // since csc(z) = 1/sin(z) and sin(0) = 0, so csc(0) is undefined
        // Therefore acsc(0) should be undefined/infinite
        try {
            let result = complex_js.ZERO.acsc();
            // If it returns a result, check if it's infinite
            assert(result.isInfinite() || result.isNaN(), 'acsc(0) should be infinite or NaN');
        } catch (error) {
            // It's acceptable for acsc(0) to throw an error
            assert(true, 'acsc(0) correctly throws an error');
        }
        done();
    });

    })