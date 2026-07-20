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
        
        // Test ZERO does not equal non-zero complex numbers
        let one = new complex_js(1, 0);
        assert.strictEqual(complex_js.ZERO.equals(one), false);
        
        let i = new complex_js(0, 1);
        assert.strictEqual(complex_js.ZERO.equals(i), false);
        
        let complex = new complex_js(3, 4);
        assert.strictEqual(complex_js.ZERO.equals(complex), false);
        
        // Test with infinity (should return false as per note)
        let infinity = new complex_js(Infinity);
        assert.strictEqual(complex_js.ZERO.equals(infinity), false);
        
        // Test with negative numbers
        let negativeReal = new complex_js(-1, 0);
        assert.strictEqual(complex_js.ZERO.equals(negativeReal), false);
        
        let negativeImaginary = new complex_js(0, -1);
        assert.strictEqual(complex_js.ZERO.equals(negativeImaginary), false);
        
        // Test with very small numbers (should not equal zero)
        let verySmall = new complex_js(1e-10, 0);
        assert.strictEqual(complex_js.ZERO.equals(verySmall), false);
        
        done();
    });
});