let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.equals', function(done) {
        // Test ZERO equals itself
        assert.strictEqual(complex_js.ZERO.equals(complex_js.ZERO), true);
        
        // Test ZERO equals another zero complex number
        let zero = new complex_js(0, 0);
        assert.strictEqual(complex_js.ZERO.equals(zero), true);
        
        // Test ZERO does not equal a non-zero complex number
        let nonZero = new complex_js(1, 0);
        assert.strictEqual(complex_js.ZERO.equals(nonZero), false);
        
        // Test ZERO does not equal a complex number with imaginary part
        let imaginary = new complex_js(0, 1);
        assert.strictEqual(complex_js.ZERO.equals(imaginary), false);
        
        // Test ZERO equals a regular number 0
        assert.strictEqual(complex_js.ZERO.equals(0), true);
        
        // Test ZERO does not equal a non-zero regular number
        assert.strictEqual(complex_js.ZERO.equals(5), false);
        
        // Test the special case mentioned in the note: Infinity
        assert.strictEqual(complex_js.ZERO.equals(Infinity), false);
        
        // Test ZERO does not equal undefined or null
        assert.strictEqual(complex_js.ZERO.equals(undefined), false);
        assert.strictEqual(complex_js.ZERO.equals(null), false);
        
        // Test with negative zero
        let negativeZero = new complex_js(-0, -0);
        assert.strictEqual(complex_js.ZERO.equals(negativeZero), true);
        
        done();
    });
});