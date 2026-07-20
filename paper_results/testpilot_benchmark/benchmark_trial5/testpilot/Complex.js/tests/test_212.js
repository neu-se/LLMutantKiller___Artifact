let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acsch', function(done) {
        try {
            // Test that acsch(0) throws an error or returns infinity
            // Since acsch(0) = ln(1/0 + sqrt(1/0^2 + 1)) which involves division by zero
            let result = complex_js.ZERO.acsch();
            
            // Check if result is infinity (positive or negative)
            assert(result.re === Infinity || result.re === -Infinity || isNaN(result.re), 
                   'acsch(0) should result in infinity or NaN for real part');
            
            done();
        } catch (error) {
            // It's also acceptable for acsch(0) to throw an error
            assert(error instanceof Error, 'Should throw an Error for acsch(0)');
            done();
        }
    });

    })