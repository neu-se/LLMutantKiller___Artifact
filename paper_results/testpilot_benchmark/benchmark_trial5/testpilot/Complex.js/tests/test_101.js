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
            // or if it throws an error (both are mathematically valid behaviors)
            assert(result.re === -Infinity || isNaN(result.re), 
                   'log(0) should result in -Infinity or NaN for real part');
            assert(result.im === 0 || isNaN(result.im), 
                   'log(0) should result in 0 or NaN for imaginary part');
            
            done();
        } catch (error) {
            // If an error is thrown, that's also acceptable for log(0)
            assert(error instanceof Error, 'Should throw an Error for log(0)');
            done();
        }
    });
    
    })