let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acsc', function(done) {
        // Test the special case: acsc(0) should return (π/2, ∞)
        let result = complex_js.ZERO.acsc();
        
        // Check that the real part is π/2
        assert.strictEqual(result.re, Math.PI / 2);
        
        // Check that the imaginary part is Infinity
        assert.strictEqual(result.im, Infinity);
        
        done();
    });
    
    })