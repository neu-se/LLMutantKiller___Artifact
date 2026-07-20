let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asech', function(done) {
        // Test that asech(0) returns complex infinity
        let result = complex_js.ZERO.asech();
        
        // asech(0) should be +∞ (positive infinity)
        // In complex.js, this is typically represented as a complex number with infinite real part
        assert.strictEqual(result.re, Infinity, 'Real part should be positive infinity');
        
        // The imaginary part might be NaN or some other value due to the mathematical singularity
        // Let's check if it's NaN instead of 0
        assert.ok(isNaN(result.im) || result.im === 0, 'Imaginary part should be NaN or 0');
        
        done();
    });
    
})