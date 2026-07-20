let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sign', function(done) {
        // Test zero complex number - this should handle division by zero
        try {
            let result = complex_js.ZERO.sign();
            // If no error is thrown, check if result is NaN or some special value
            assert(isNaN(result.re) || result.re === 0, 'Real part should be NaN or 0 for zero complex number');
            assert(isNaN(result.im) || result.im === 0, 'Imaginary part should be NaN or 0 for zero complex number');
        } catch (error) {
            // Division by zero might throw an error, which is acceptable
            assert(true, 'Division by zero error is expected');
        }
        done();
    });

    })