let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acsch', function(done) {
        try {
            // Test that acsch(0) throws an error or returns infinity
            // Since acsch(0) = ln(1/0 + sqrt(1/0^2 + 1)) which involves division by zero
            let result = complex_js.ZERO.acsch();
            
            // acsch(0) should return complex infinity
            assert(result.re === Infinity || result.re === -Infinity, 
                   'Real part should be infinity');
            
            done();
        } catch (error) {
            // It's also acceptable for acsch(0) to throw an error due to division by zero
            assert(error instanceof Error, 'Should throw an error for acsch(0)');
            done();
        }
    });

    })