let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        // Test the logarithm of zero (0 + 0i)
        let result = complex_js.ZERO.log();
        
        // The logarithm of zero should return -Infinity for the real part
        // and 0 for the imaginary part (since atan2(0, 0) = 0)
        assert.strictEqual(result.re, -Infinity, 'Real part should be -Infinity');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        done();
    });
    
    })