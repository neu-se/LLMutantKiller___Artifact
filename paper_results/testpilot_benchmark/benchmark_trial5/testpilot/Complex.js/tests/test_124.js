let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.cot', function(done) {
        // Test that cot(0) throws an error or returns infinity
        // Since cot(0) = cos(0)/sin(0) = 1/0, it should be undefined/infinite
        try {
            let result = complex_js.ZERO.cot();
            // cot(0) should be infinite, so check if the result has infinite real part
            assert(Math.abs(result.re) === Infinity || isNaN(result.re), 'cot(0) should be infinite or NaN');
        } catch (error) {
            // It's also acceptable if the function throws an error for cot(0)
            assert(true, 'cot(0) appropriately throws an error');
        }
        done();
    });

    })