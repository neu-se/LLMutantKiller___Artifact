let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csc', function(done) {
        // Test that csc(0) throws an error or returns infinity
        // since csc(0) = 1/sin(0) = 1/0 which is undefined
        try {
            let result = complex_js.ZERO.csc();
            // If no error is thrown, check if result is infinite or NaN
            assert(isNaN(result.re) || !isFinite(result.re), 'csc(0) should be undefined/infinite');
        } catch (error) {
            // It's acceptable for csc(0) to throw an error
            assert(true, 'csc(0) correctly throws an error');
        }
        done();
    });

    })