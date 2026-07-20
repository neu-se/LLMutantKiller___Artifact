let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.valueOf returns zero values', function(done) {
        let result = complex_js.ZERO.valueOf();
        
        // Test that both real and imaginary parts are zero
        // valueOf() might return a primitive number for zero complex numbers
        if (typeof result === 'number') {
            assert.strictEqual(result, 0, 'valueOf should return 0 for zero complex number');
        } else {
            // If it returns an object with re/im properties
            assert.strictEqual(result.re, 0, 'real part should be 0');
            assert.strictEqual(result.im, 0, 'imaginary part should be 0');
        }
        
        done();
    });
});