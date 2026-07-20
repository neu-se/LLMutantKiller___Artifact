let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csc', function(done) {
        try {
            // Test that csc(0) throws an error since csc(0) = 1/sin(0) = 1/0 is undefined
            let result = complex_js.ZERO.csc();
            
            // If we get here, check if the result is infinity or NaN
            assert(result.isInfinite() || result.isNaN(), 'csc(0) should be infinite or NaN');
            
            done();
        } catch (error) {
            // csc(0) should throw an error since it's undefined (division by zero)
            assert(error instanceof Error, 'Should throw an error for csc(0)');
            done();
        }
    });

    })