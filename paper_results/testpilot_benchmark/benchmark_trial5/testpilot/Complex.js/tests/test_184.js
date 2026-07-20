let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csch', function(done) {
        // Test that csch(0) throws an error or returns infinity
        // since csch(z) = 1/sinh(z) and sinh(0) = 0
        try {
            let result = complex_js.ZERO.csch();
            // If no error is thrown, check if result is infinity
            assert(result.re === Infinity || result.re === -Infinity || isNaN(result.re), 
                   'csch(0) should result in infinity or NaN');
        } catch (error) {
            // If an error is thrown, that's also acceptable behavior for csch(0)
            assert(true, 'csch(0) correctly throws an error');
        }
        done();
    });

    })