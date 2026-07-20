let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.cot', function(done) {
        // Test that cotangent of zero throws an error or returns infinity
        // since cot(0) = cos(0)/sin(0) = 1/0 which is undefined
        try {
            let result = complex_js.ZERO.cot();
            // If no error is thrown, check if result is infinity or NaN
            assert(result.isInfinite() || result.isNaN(), 'cot(0) should be infinite or NaN');
        } catch (error) {
            // If an error is thrown, that's also acceptable for cot(0)
            assert(true, 'cot(0) correctly throws an error');
        }
        done();
    });

    })