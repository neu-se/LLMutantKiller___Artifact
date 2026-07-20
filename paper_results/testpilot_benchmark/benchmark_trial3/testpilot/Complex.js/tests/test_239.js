let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.neg', function(done) {
        // Test that negating ZERO returns ZERO
        let negatedZero = complex_js.ZERO.neg();
        
        // ZERO should have real and imaginary parts equal to 0
        assert.strictEqual(negatedZero.re, 0, 'Real part of negated zero should be 0');
        assert.strictEqual(negatedZero.im, 0, 'Imaginary part of negated zero should be 0');
        
        // Verify it's still equivalent to ZERO
        assert.strictEqual(negatedZero.re, complex_js.ZERO.re, 'Negated zero real part should equal ZERO real part');
        assert.strictEqual(negatedZero.im, complex_js.ZERO.im, 'Negated zero imaginary part should equal ZERO imaginary part');
        
        done();
    });
    
    })