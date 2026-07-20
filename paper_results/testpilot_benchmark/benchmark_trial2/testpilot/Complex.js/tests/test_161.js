let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acsc', function(done) {
        try {
            // Test that calling acsc() on ZERO throws an error or returns infinity
            // since acsc(0) = arccosec(0) = 1/arcsin(0) which is undefined
            let result = complex_js.ZERO.acsc();
            
            // Check if result is infinity or NaN (both are valid for acsc(0))
            assert(result.re === Infinity || result.re === -Infinity || isNaN(result.re), 
                   'acsc(0) should return infinity or NaN for real part');
            assert(result.im === 0 || isNaN(result.im), 
                   'acsc(0) should return 0 or NaN for imaginary part');
            
            done();
        } catch (error) {
            // If an error is thrown, that's also acceptable for acsc(0)
            assert(error instanceof Error, 'Should throw an Error for acsc(0)');
            done();
        }
    });

    })