let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test that ZERO.neg() does not modify original ZERO', function(done) {
        // Store original values
        let originalRe = complex_js.ZERO.re;
        let originalIm = complex_js.ZERO.im;
        
        // Call neg() method
        complex_js.ZERO.neg();
        
        // Verify original ZERO is unchanged
        assert.strictEqual(complex_js.ZERO.re, originalRe, 'Original ZERO real part should be unchanged');
        assert.strictEqual(complex_js.ZERO.im, originalIm, 'Original ZERO imaginary part should be unchanged');
        
        done();
    });
    
    })