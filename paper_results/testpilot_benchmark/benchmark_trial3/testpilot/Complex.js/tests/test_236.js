let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.neg', function(done) {
        // Test that ZERO.neg() returns a new Complex number with negated real and imaginary parts
        let result = complex_js.ZERO.neg();
        
        // ZERO should have re=0 and im=0, so neg() should return -0 and -0
        assert.strictEqual(result.re, -0);
        assert.strictEqual(result.im, -0);
        
        // Verify it's a new Complex instance, not the same object
        assert.notStrictEqual(result, complex_js.ZERO);
        
        // Verify the original ZERO is unchanged
        assert.strictEqual(complex_js.ZERO.re, 0);
        assert.strictEqual(complex_js.ZERO.im, 0);
        
        done();
    });
    
    })