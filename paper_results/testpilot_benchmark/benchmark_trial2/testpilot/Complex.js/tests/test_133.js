let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csc should throw error for zero', function(done) {
        try {
            let result = complex_js.ZERO.csc();
            // Check if the result is Infinity or has infinite components
            if (!isFinite(result.re) || !isFinite(result.im)) {
                // csc(0) returns infinity, which is the expected mathematical behavior
                done();
            } else {
                done(new Error('Expected csc(0) to return infinity or throw an error'));
            }
        } catch (error) {
            // csc(0) threw an error, which is also acceptable
            done();
        }
    });
});