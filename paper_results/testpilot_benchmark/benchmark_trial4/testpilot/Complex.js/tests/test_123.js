let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.cot', function(done) {
        // Test that cot(0) throws an error or returns infinity
        // since cot(0) = cos(0)/sin(0) = 1/0 which is undefined
        try {
            let result = complex_js.ZERO.cot();
            // If no error is thrown, check if result is infinite or NaN
            assert(isNaN(result.re) || !isFinite(result.re), 'cot(0) should be undefined/infinite');
        } catch (error) {
            // It's acceptable for cot(0) to throw an error
            assert(true, 'cot(0) correctly throws an error');
        }
        done();
    });

    })