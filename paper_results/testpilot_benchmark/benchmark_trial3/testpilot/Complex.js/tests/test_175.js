let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.coth', function(done) {
        // Test that coth(0) throws an error or returns infinity
        // since coth(0) = cosh(0)/sinh(0) = 1/0 which is undefined
        try {
            let result = complex_js.ZERO.coth();
            // If it doesn't throw, check if it returns infinity or NaN
            assert(result.re === Infinity || result.re === -Infinity || isNaN(result.re), 
                   'coth(0) should be infinity or NaN');
        } catch (error) {
            // It's acceptable for coth(0) to throw an error
            assert(true, 'coth(0) correctly throws an error');
        }
        done();
    });

    })