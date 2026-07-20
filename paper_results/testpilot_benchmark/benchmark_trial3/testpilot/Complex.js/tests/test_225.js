let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test ZERO conjugate is immutable', function(done) {
        // Test that calling conjugate doesn't modify the original ZERO constant
        let originalRe = complex_js.ZERO.re;
        let originalIm = complex_js.ZERO.im;
        
        complex_js.ZERO.conjugate();
        
        assert.strictEqual(complex_js.ZERO.re, originalRe, 'Original ZERO real part should be unchanged');
        assert.strictEqual(complex_js.ZERO.im, originalIm, 'Original ZERO imaginary part should be unchanged');
        
        done();
    });
    
    })