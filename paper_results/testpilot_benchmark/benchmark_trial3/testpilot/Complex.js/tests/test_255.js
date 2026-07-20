let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.equals', function(done) {
        // Test that ZERO equals itself
        assert.strictEqual(complex_js.ZERO.equals(complex_js.ZERO), true);
        
        // Test that ZERO equals another zero complex number
        let zero = new complex_js(0, 0);
        assert.strictEqual(complex_js.ZERO.equals(zero), true);
        
        // Test that ZERO does not equal a non-zero complex number
        let nonZero = new complex_js(1, 0);
        assert.strictEqual(complex_js.ZERO.equals(nonZero), false);
        
        // Test that ZERO does not equal a complex number with imaginary part
        let imaginary = new complex_js(0, 1);
        assert.strictEqual(complex_js.ZERO.equals(imaginary), false);
        
        // Test that ZERO does not equal a complex number with both real and imaginary parts
        let complex = new complex_js(1, 1);
        assert.strictEqual(complex_js.ZERO.equals(complex), false);
        
        // Test with negative values
        let negativeReal = new complex_js(-1, 0);
        assert.strictEqual(complex_js.ZERO.equals(negativeReal), false);
        
        let negativeImaginary = new complex_js(0, -1);
        assert.strictEqual(complex_js.ZERO.equals(negativeImaginary), false);
        
        done();
    });
});