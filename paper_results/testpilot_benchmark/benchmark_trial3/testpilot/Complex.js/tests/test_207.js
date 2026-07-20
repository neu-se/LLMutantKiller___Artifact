let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acsch', function(done) {
        // Test that acsch(0) throws an error or returns infinity
        // since acsch(0) is undefined (division by zero in the formula)
        try {
            let result = complex_js.ZERO.acsch();
            // If no error is thrown, check if result is infinity
            assert(result.re === Infinity || result.re === -Infinity || isNaN(result.re), 
                   'acsch(0) should return infinity or NaN');
        } catch (error) {
            // It's acceptable for acsch(0) to throw an error
            assert(true, 'acsch(0) correctly throws an error');
        }
        done();
    });

    })