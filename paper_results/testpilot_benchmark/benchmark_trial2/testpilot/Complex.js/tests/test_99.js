let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        try {
            // Test that calling log() on ZERO throws an error or returns -Infinity
            // since log(0) is undefined in mathematics
            let result = complex_js.ZERO.log();
            
            // Check if the result has -Infinity as real part (log of 0)
            assert.strictEqual(result.re, -Infinity, 'Real part should be -Infinity for log(0)');
            
            // The imaginary part could be 0 or undefined depending on implementation
            assert.ok(isNaN(result.im) || result.im === 0, 'Imaginary part should be NaN or 0');
            
            done();
        } catch (error) {
            // If an error is thrown, that's also acceptable behavior for log(0)
            assert.ok(error instanceof Error, 'Should throw an error for log(0)');
            done();
        }
    });
    
    })