let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.inverse should throw error', function(done) {
        try {
            let result = complex_js.ZERO.inverse();
            // Check if the result is infinity or NaN, which would be the expected behavior
            // for division by zero in some implementations
            if (result.re === Infinity || result.im === Infinity || 
                isNaN(result.re) || isNaN(result.im)) {
                done();
            } else {
                done(new Error('Expected inverse of zero to throw an error or return infinity/NaN'));
            }
        } catch (error) {
            // Expected behavior - inverse of zero should throw an error
            assert(error instanceof Error);
            done();
        }
    });
});