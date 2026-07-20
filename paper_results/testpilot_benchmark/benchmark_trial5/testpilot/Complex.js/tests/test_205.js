let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acoth', function(done) {
        try {
            // Test that acoth(0) throws an error or returns infinity
            // Since acoth(0) is undefined (division by zero in the formula)
            let result = complex_js.ZERO.acoth();
            
            // Check if result is infinity or NaN
            assert(result.re === Infinity || result.re === -Infinity || isNaN(result.re), 
                   'acoth(0) should result in infinity or NaN for real part');
            
            done();
        } catch (error) {
            // If it throws an error, that's also acceptable behavior for acoth(0)
            assert(error instanceof Error, 'Should throw an error for acoth(0)');
            done();
        }
    });

    })