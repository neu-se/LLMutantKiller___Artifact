let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.equals', function(done) {
        // Test ZERO equals itself (0, 0)
        assert.strictEqual(complex_js.ZERO.equals(0, 0), true);
        
        // Test ZERO equals another zero representation
        assert.strictEqual(complex_js.ZERO.equals(0), true);
        
        // Test ZERO does not equal non-zero real number
        assert.strictEqual(complex_js.ZERO.equals(1, 0), false);
        assert.strictEqual(complex_js.ZERO.equals(5), false);
        
        // Test ZERO does not equal non-zero imaginary number
        assert.strictEqual(complex_js.ZERO.equals(0, 1), false);
        assert.strictEqual(complex_js.ZERO.equals(0, -3), false);
        
        // Test ZERO does not equal complex number with both real and imaginary parts
        assert.strictEqual(complex_js.ZERO.equals(1, 1), false);
        assert.strictEqual(complex_js.ZERO.equals(-2, 3), false);
        
        // Test with very small numbers (within epsilon tolerance)
        assert.strictEqual(complex_js.ZERO.equals(1e-16, 1e-16), true);
        assert.strictEqual(complex_js.ZERO.equals(-1e-16, -1e-16), true);
        
        // Test with numbers just outside epsilon tolerance
        assert.strictEqual(complex_js.ZERO.equals(1e-10, 0), false);
        assert.strictEqual(complex_js.ZERO.equals(0, 1e-10), false);
        
        // Test the special case mentioned in the note: Infinity should return false
        assert.strictEqual(complex_js.ZERO.equals(Infinity), false);
        assert.strictEqual(complex_js.ZERO.equals(Infinity, 0), false);
        assert.strictEqual(complex_js.ZERO.equals(0, Infinity), false);
        assert.strictEqual(complex_js.ZERO.equals(Infinity, Infinity), false);
        
        // Test with NaN
        assert.strictEqual(complex_js.ZERO.equals(NaN), false);
        assert.strictEqual(complex_js.ZERO.equals(0, NaN), false);
        assert.strictEqual(complex_js.ZERO.equals(NaN, NaN), false);
        
        done();
    });
});