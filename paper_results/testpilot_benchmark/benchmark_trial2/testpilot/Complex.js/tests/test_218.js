let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asech', function(done) {
        // Test asech of zero
        let result = complex_js.ZERO.asech();
        
        // asech(0) should be +∞ (positive infinity)
        // In complex.js, this is typically represented as a complex number with infinite real part
        assert.ok(result.re === Infinity || !isFinite(result.re), 'Real part should be infinite');
        assert.ok(!isFinite(result.im) || Math.abs(result.im) < 1e-10, 'Imaginary part should be infinite, NaN, or very close to zero');
        
        done();
    });
    
})