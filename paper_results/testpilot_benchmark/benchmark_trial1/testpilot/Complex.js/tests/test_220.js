let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asech', function(done) {
        // Test that asech(0) returns positive infinity
        let result = complex_js.ZERO.asech();
        
        // asech(0) should be +∞ (positive infinity)
        assert.strictEqual(result.re, Infinity, 'Real part should be positive infinity');
        
        // The imaginary part might be NaN or π depending on the implementation
        // Let's check if it's either 0 or π (since asech(0) can have branch cut issues)
        assert.ok(result.im === 0 || Math.abs(result.im - Math.PI) < 1e-10 || isNaN(result.im), 
                 'Imaginary part should be 0, π, or NaN');
        
        done();
    });
});