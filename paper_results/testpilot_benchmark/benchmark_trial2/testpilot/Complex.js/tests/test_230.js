let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.conjugate', function(done) {
        // Test that ZERO conjugate returns a new Complex with same real part and negated imaginary part
        let result = complex_js.ZERO.conjugate();
        
        // ZERO should have re=0 and im=0, so conjugate should also be 0+0i
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0 (negated 0)');
        
        // Verify it returns a new Complex instance
        assert(result instanceof complex_js, 'Should return a Complex instance');
        
        // Verify original ZERO is unchanged
        assert.strictEqual(complex_js.ZERO.re, 0, 'Original ZERO real part unchanged');
        assert.strictEqual(complex_js.ZERO.im, 0, 'Original ZERO imaginary part unchanged');
        
        done();
    });
    
    })