let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log should return negative infinity for log of zero', function(done) {
        try {
            let result = complex_js.ZERO.log();
            // Check if the result represents negative infinity
            // In complex.js, log(0) typically returns a complex number with real part -Infinity
            if (result.re === -Infinity) {
                done();
            } else {
                done(new Error(`Expected log of zero to have real part -Infinity, but got ${result.re}`));
            }
        } catch (error) {
            // If an error is thrown, that's unexpected based on the test failure
            done(new Error(`Unexpected error thrown: ${error.message}`));
        }
    });
});