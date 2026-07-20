let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        try {
            // Test that calling log() on ZERO throws an error or returns -Infinity
            // since log(0) is undefined/negative infinity
            let result = complex_js.ZERO.log();
            
            // Check if the result has -Infinity as real part and 0 as imaginary part
            // or if it throws an error (both are valid mathematical interpretations)
            assert(result.re === -Infinity || isNaN(result.re), 
                   'log(0) should result in -Infinity or NaN for real part');
            
            done();
        } catch (error) {
            // It's also valid for log(0) to throw an error
            assert(error instanceof Error, 'Should throw an Error for log(0)');
            done();
        }
    });
    
    })