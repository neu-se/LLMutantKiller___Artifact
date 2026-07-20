let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.equals', function(done) {
        // Test that ZERO equals itself (0, 0)
        assert.strictEqual(complex_js.ZERO.equals(0, 0), true);
        
        // Test that ZERO equals another zero representation
        assert.strictEqual(complex_js.ZERO.equals(0.0, 0.0), true);
        
        // Test that ZERO does not equal non-zero real part
        assert.strictEqual(complex_js.ZERO.equals(1, 0), false);
        
        // Test that ZERO does not equal non-zero imaginary part
        assert.strictEqual(complex_js.ZERO.equals(0, 1), false);
        
        // Test that ZERO does not equal non-zero complex number
        assert.strictEqual(complex_js.ZERO.equals(1, 1), false);
        
        // Test with negative values
        assert.strictEqual(complex_js.ZERO.equals(-1, 0), false);
        assert.strictEqual(complex_js.ZERO.equals(0, -1), false);
        
        // Test with very small values within epsilon tolerance
        assert.strictEqual(complex_js.ZERO.equals(1e-16, 1e-16), true);
        
        // Test with values just outside epsilon tolerance
        assert.strictEqual(complex_js.ZERO.equals(1e-10, 0), false);
        assert.strictEqual(complex_js.ZERO.equals(0, 1e-10), false);
        
        done();
    });
});