let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.clone', function(done) {
        // Test that ZERO.clone() returns a new complex number instance
        let clonedZero = complex_js.ZERO.clone();
        
        // Verify the cloned object is a complex number
        assert(clonedZero instanceof complex_js, 'Cloned object should be an instance of complex.js');
        
        // Verify the cloned zero has the same values as original ZERO
        assert.strictEqual(clonedZero.re, 0, 'Real part should be 0');
        assert.strictEqual(clonedZero.im, 0, 'Imaginary part should be 0');
        
        // Verify it's a different object instance (not the same reference)
        assert(clonedZero !== complex_js.ZERO, 'Cloned object should be a different instance');
        
        // Verify modifying the clone doesn't affect the original
        clonedZero.re = 5;
        assert.strictEqual(complex_js.ZERO.re, 0, 'Original ZERO should remain unchanged');
        
        done();
    });
    
    })