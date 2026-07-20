let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.equals', function(done) {
        // Test that ZERO equals itself
        assert.strictEqual(complex_js.ZERO.equals(complex_js.ZERO), true);
        
        // Test that ZERO equals another zero complex number
        let zero1 = new complex_js(0, 0);
        assert.strictEqual(complex_js.ZERO.equals(zero1), true);
        
        // Test that ZERO does not equal a non-zero complex number
        let nonZero1 = new complex_js(1, 0);
        assert.strictEqual(complex_js.ZERO.equals(nonZero1), false);
        
        // Test that ZERO does not equal a complex number with imaginary part
        let nonZero2 = new complex_js(0, 1);
        assert.strictEqual(complex_js.ZERO.equals(nonZero2), false);
        
        // Test that ZERO does not equal a complex number with both real and imaginary parts
        let nonZero3 = new complex_js(1, 1);
        assert.strictEqual(complex_js.ZERO.equals(nonZero3), false);
        
        // Test with negative values
        let nonZero4 = new complex_js(-1, -1);
        assert.strictEqual(complex_js.ZERO.equals(nonZero4), false);
        
        done();
    });
});