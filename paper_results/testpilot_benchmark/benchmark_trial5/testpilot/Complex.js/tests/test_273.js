let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.equals', function(done) {
        // Test ZERO equals itself
        assert.strictEqual(complex_js.ZERO.equals(0, 0), true);
        
        // Test ZERO equals zero with different representations
        assert.strictEqual(complex_js.ZERO.equals(0), true);
        assert.strictEqual(complex_js.ZERO.equals(-0, 0), true);
        assert.strictEqual(complex_js.ZERO.equals(0, -0), true);
        
        // Test ZERO does not equal non-zero real numbers
        assert.strictEqual(complex_js.ZERO.equals(1, 0), false);
        assert.strictEqual(complex_js.ZERO.equals(-1, 0), false);
        assert.strictEqual(complex_js.ZERO.equals(0.5), false);
        
        // Test ZERO does not equal non-zero imaginary numbers
        assert.strictEqual(complex_js.ZERO.equals(0, 1), false);
        assert.strictEqual(complex_js.ZERO.equals(0, -1), false);
        assert.strictEqual(complex_js.ZERO.equals(0, 0.5), false);
        
        // Test ZERO does not equal complex numbers with both real and imaginary parts
        assert.strictEqual(complex_js.ZERO.equals(1, 1), false);
        assert.strictEqual(complex_js.ZERO.equals(-1, -1), false);
        assert.strictEqual(complex_js.ZERO.equals(3, 4), false);
        
        // Test with very small numbers (within epsilon tolerance)
        const epsilon = complex_js.EPSILON || 1e-15;
        assert.strictEqual(complex_js.ZERO.equals(epsilon/2, epsilon/2), true);
        assert.strictEqual(complex_js.ZERO.equals(-epsilon/2, -epsilon/2), true);
        
        // Test with numbers just outside epsilon tolerance
        assert.strictEqual(complex_js.ZERO.equals(epsilon*2, 0), false);
        assert.strictEqual(complex_js.ZERO.equals(0, epsilon*2), false);
        
        // Test the special case mentioned in the comment: Infinity should return false
        assert.strictEqual(complex_js.ZERO.equals(Infinity), false);
        assert.strictEqual(complex_js.ZERO.equals(Infinity, 0), false);
        assert.strictEqual(complex_js.ZERO.equals(0, Infinity), false);
        assert.strictEqual(complex_js.ZERO.equals(Infinity, Infinity), false);
        
        // Test with NaN
        assert.strictEqual(complex_js.ZERO.equals(NaN), false);
        assert.strictEqual(complex_js.ZERO.equals(NaN, 0), false);
        assert.strictEqual(complex_js.ZERO.equals(0, NaN), false);
        assert.strictEqual(complex_js.ZERO.equals(NaN, NaN), false);
        
        done();
    });
});