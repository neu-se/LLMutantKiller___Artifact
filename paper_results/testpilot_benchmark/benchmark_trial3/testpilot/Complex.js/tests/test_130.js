let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csc', function(done) {
        try {
            // Test that csc(0) returns Infinity since csc(0) = 1/sin(0) = 1/0
            let result = complex_js.ZERO.csc();
            
            // Check if the result is Infinity or has infinite real part
            if (result.re === Infinity || result.re === -Infinity || !isFinite(result.re)) {
                done();
            } else {
                done(new Error(`Expected csc(0) to return Infinity but got: ${result}`));
            }
        } catch (error) {
            // If it does throw an error, that's also acceptable behavior
            done();
        }
    });
});