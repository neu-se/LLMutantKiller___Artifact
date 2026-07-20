let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.neg', function(done) {
        // Test that negating ZERO returns ZERO
        let negatedZero = complex_js.ZERO.neg();
        
        // ZERO should have real part 0 and imaginary part 0
        // Negating ZERO should still be ZERO (0 + 0i)
        // Use Math.abs to handle potential floating-point precision issues
        assert.ok(Math.abs(negatedZero.re) < Number.EPSILON, 'Real part of negated ZERO should be 0');
        assert.ok(Math.abs(negatedZero.im) < Number.EPSILON, 'Imaginary part of negated ZERO should be 0');
        
        // Verify the result is equivalent to ZERO
        assert.ok(Math.abs(negatedZero.re - complex_js.ZERO.re) < Number.EPSILON, 'Negated ZERO real part should equal ZERO real part');
        assert.ok(Math.abs(negatedZero.im - complex_js.ZERO.im) < Number.EPSILON, 'Negated ZERO imaginary part should equal ZERO imaginary part');
        
        done();
    });
});