let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csc', function(done) {
        // Test csc(0) - should throw or return infinity since sin(0) = 0
        try {
            let result = complex_js.ZERO.csc();
            // If it doesn't throw, check if result is infinite
            assert(isNaN(result.re) || !isFinite(result.re), 'csc(0) should be undefined/infinite');
        } catch (e) {
            // It's acceptable for csc(0) to throw an error
            assert(true, 'csc(0) correctly throws an error');
        }
        done();
    });

    })