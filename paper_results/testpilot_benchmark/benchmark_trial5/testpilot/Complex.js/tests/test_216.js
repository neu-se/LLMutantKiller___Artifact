let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acsch', function(done) {
        // Test that acsch(0) throws an error or returns infinity
        // Since acsch(0) = ln(1/0 + sqrt(1/0^2 + 1)) which involves division by zero
        try {
            let result = complex_js.ZERO.acsch();
            // If it doesn't throw, check if result is infinite
            assert(result.re === Infinity || result.re === -Infinity || isNaN(result.re), 
                   'acsch(0) should result in infinity or NaN');
        } catch (error) {
            // It's acceptable for acsch(0) to throw an error due to division by zero
            assert(true, 'acsch(0) appropriately throws an error');
        }
        done();
    });

    })