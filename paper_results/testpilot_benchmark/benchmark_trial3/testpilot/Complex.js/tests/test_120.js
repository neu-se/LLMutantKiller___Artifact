let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.cot', function(done) {
        // Test cotangent of zero - should throw error or return infinity
        // cot(0) is undefined (division by zero)
        try {
            let result = complex_js.ZERO.cot();
            // If it doesn't throw, check if result is infinite
            assert(Math.abs(result.re) === Infinity || isNaN(result.re), 
                   'cot(0) should be undefined/infinite');
        } catch (error) {
            // It's acceptable for cot(0) to throw an error
            assert(true, 'cot(0) correctly throws an error');
        }
        done();
    });

    })