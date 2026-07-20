let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.neg', function(done) {
        // Test that negating ZERO returns ZERO
        let negatedZero = complex_js.ZERO.neg();
        
        // Check that the result is still zero (using tolerance for floating point comparison)
        assert.ok(Math.abs(negatedZero.re) < 1e-10, 'Real part should be 0');
        assert.ok(Math.abs(negatedZero.im) < 1e-10, 'Imaginary part should be 0');
        
        // Check that the original ZERO constant is unchanged
        assert.strictEqual(complex_js.ZERO.re, 0, 'Original ZERO real part should remain 0');
        assert.strictEqual(complex_js.ZERO.im, 0, 'Original ZERO imaginary part should remain 0');
        
        done();
    });
});