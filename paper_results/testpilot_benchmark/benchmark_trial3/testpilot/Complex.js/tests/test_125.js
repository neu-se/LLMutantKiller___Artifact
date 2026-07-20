let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csc', function(done) {
        try {
            // Test that csc(0) throws an error since csc(0) = 1/sin(0) = 1/0 is undefined
            complex_js.ZERO.csc();
            // If we reach here, the function didn't throw an error as expected
            done(new Error('Expected csc(0) to throw an error but it did not'));
        } catch (error) {
            // Expected behavior - csc(0) should throw an error
            done();
        }
    });

    })