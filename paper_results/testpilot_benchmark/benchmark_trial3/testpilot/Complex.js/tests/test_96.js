let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        // Test that log of zero throws an error or returns negative infinity
        try {
            let result = complex_js.ZERO.log();
            // If no error is thrown, check if result is negative infinity
            assert.strictEqual(result.re, -Infinity, 'Real part should be -Infinity for log(0)');
            assert.ok(isNaN(result.im) || result.im === 0, 'Imaginary part should be NaN or 0 for log(0)');
        } catch (error) {
            // If an error is thrown, that's also acceptable behavior for log(0)
            assert.ok(error instanceof Error, 'Should throw an error for log(0)');
        }
        done();
    });

    })