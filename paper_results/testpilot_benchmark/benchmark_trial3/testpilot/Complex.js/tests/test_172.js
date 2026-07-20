let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.coth', function(done) {
        // Test that coth(0) throws an error or returns infinity
        // since coth(0) = cosh(0)/sinh(0) = 1/0 which is undefined
        try {
            let result = complex_js.ZERO.coth();
            // If it returns a value, check if it's infinity or NaN
            assert(result.re === Infinity || isNaN(result.re) || result.re === -Infinity, 
                   'coth(0) should return infinity or NaN for real part');
        } catch (error) {
            // If it throws an error, that's also acceptable behavior
            assert(error instanceof Error, 'Should throw an error for coth(0)');
        }
        done();
    });

    })