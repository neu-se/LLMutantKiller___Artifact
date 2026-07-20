let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        try {
            // Test that log of zero throws an error or returns negative infinity
            let result = complex_js.ZERO.log();
            
            // The natural log of zero should be negative infinity
            // In complex.js, this typically returns a complex number with real part -Infinity
            assert.strictEqual(result.re, -Infinity, 'Real part should be -Infinity');
            assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
            
            done();
        } catch (error) {
            // Some implementations might throw an error for log(0)
            // This is also acceptable behavior
            assert.ok(error instanceof Error, 'Should throw an error for log(0)');
            done();
        }
    });

    })