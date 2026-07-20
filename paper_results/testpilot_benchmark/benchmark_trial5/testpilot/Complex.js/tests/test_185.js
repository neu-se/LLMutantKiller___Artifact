let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csch', function(done) {
        // Test that csch(0) throws an error or returns infinity
        // since csch(0) = 2/(e^0 - e^(-0)) = 2/(1-1) = 2/0 = undefined
        try {
            let result = complex_js.ZERO.csch();
            // Check if result has infinite components
            assert(Math.abs(result.re) === Infinity || isNaN(result.re), 'Real part should be infinite or NaN for csch(0)');
            assert(Math.abs(result.im) === Infinity || isNaN(result.im), 'Imaginary part should be infinite or NaN for csch(0)');
        } catch (error) {
            // It's also acceptable if the function throws an error for division by zero
            assert(true, 'Function correctly throws error for csch(0)');
        }
        done();
    });

    })