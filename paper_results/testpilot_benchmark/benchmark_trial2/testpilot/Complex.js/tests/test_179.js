let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csch', function(done) {
        // Test that csch(0) throws an error or returns infinity
        // since csch(z) = 1/sinh(z) and sinh(0) = 0
        try {
            let result = complex_js.ZERO.csch();
            // If it returns a value, it should be infinity
            assert(result.re === Infinity || result.re === -Infinity || isNaN(result.re), 
                   'csch(0) should return infinity or NaN');
        } catch (error) {
            // If it throws an error, that's also acceptable behavior
            assert(error instanceof Error, 'Should throw an error for csch(0)');
        }
        done();
    });

    })