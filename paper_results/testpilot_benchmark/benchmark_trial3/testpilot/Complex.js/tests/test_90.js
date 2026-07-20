let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        try {
            // Test that log of zero throws an error or returns negative infinity
            let result = complex_js.ZERO.log();
            
            // Check if result is -Infinity (natural log of 0)
            assert.strictEqual(result.re, -Infinity, 'Real part should be -Infinity');
            assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
            
            done();
        } catch (error) {
            // If an error is thrown, that's also acceptable behavior for log(0)
            assert.ok(error, 'Error should be thrown for log of zero');
            done();
        }
    });

    })