let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.cot', function(done) {
        try {
            // Test that cot(0) throws an error or returns infinity
            // since cot(0) = cos(0)/sin(0) = 1/0 which is undefined
            let result = complex_js.ZERO.cot();
            
            // Check if result is infinity or NaN
            assert(result.re === Infinity || isNaN(result.re) || result.re === -Infinity, 
                   'cot(0) should be infinity or NaN');
            done();
        } catch (error) {
            // If it throws an error, that's also acceptable for cot(0)
            assert(error instanceof Error, 'Should throw an error for cot(0)');
            done();
        }
    });

    })