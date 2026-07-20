let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.neg', function(done) {
        // Test that negating ZERO returns ZERO
        let negatedZero = complex_js.ZERO.neg();
        
        // ZERO should have real and imaginary parts equal to 0
        // Use a small epsilon for floating-point comparison
        const epsilon = 1e-15;
        assert.ok(Math.abs(negatedZero.re) < epsilon, 'Real part of negated zero should be 0');
        assert.ok(Math.abs(negatedZero.im) < epsilon, 'Imaginary part of negated zero should be 0');
        
        // Verify it's still equivalent to ZERO
        assert.ok(Math.abs(negatedZero.re - complex_js.ZERO.re) < epsilon, 'Negated zero real part should equal ZERO real part');
        assert.ok(Math.abs(negatedZero.im - complex_js.ZERO.im) < epsilon, 'Negated zero imaginary part should equal ZERO imaginary part');
        
        done();
    });
    
})