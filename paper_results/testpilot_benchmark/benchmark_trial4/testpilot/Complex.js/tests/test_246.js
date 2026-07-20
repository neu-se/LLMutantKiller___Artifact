let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.neg', function(done) {
        // Test that negating ZERO returns ZERO
        let negatedZero = complex_js.ZERO.neg();
        
        // ZERO should have real part 0 and imaginary part 0
        // Negating ZERO should still be ZERO (0 + 0i)
        assert.strictEqual(negatedZero.re, 0, 'Real part of negated ZERO should be 0');
        assert.strictEqual(negatedZero.im, 0, 'Imaginary part of negated ZERO should be 0');
        
        // Verify the result is equivalent to ZERO
        assert.strictEqual(negatedZero.re, complex_js.ZERO.re, 'Negated ZERO real part should equal ZERO real part');
        assert.strictEqual(negatedZero.im, complex_js.ZERO.im, 'Negated ZERO imaginary part should equal ZERO imaginary part');
        
        done();
    });
    
    })