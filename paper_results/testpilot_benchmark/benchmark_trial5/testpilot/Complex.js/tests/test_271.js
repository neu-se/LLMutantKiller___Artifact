let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.equals', function(done) {
        // Test 1: ZERO equals itself
        assert.strictEqual(complex_js.ZERO.equals(complex_js.ZERO, complex_js.ZERO), true);
        
        // Test 2: ZERO equals another zero complex number
        let zero1 = new complex_js(0, 0);
        let zero2 = new complex_js(0, 0);
        assert.strictEqual(complex_js.ZERO.equals(zero1, zero2), true);
        
        // Test 3: ZERO does not equal non-zero complex numbers
        let nonZero1 = new complex_js(1, 0);
        let nonZero2 = new complex_js(0, 1);
        assert.strictEqual(complex_js.ZERO.equals(nonZero1, nonZero2), false);
        
        // Test 4: Different non-zero complex numbers
        let complex1 = new complex_js(3, 4);
        let complex2 = new complex_js(1, 2);
        assert.strictEqual(complex_js.ZERO.equals(complex1, complex2), false);
        
        // Test 5: Same non-zero complex numbers
        let complex3 = new complex_js(2, 3);
        let complex4 = new complex_js(2, 3);
        assert.strictEqual(complex_js.ZERO.equals(complex3, complex4), true);
        
        // Test 6: Complex numbers with negative values
        let negativeComplex1 = new complex_js(-1, -2);
        let negativeComplex2 = new complex_js(-1, -2);
        assert.strictEqual(complex_js.ZERO.equals(negativeComplex1, negativeComplex2), true);
        
        // Test 7: One zero, one non-zero
        assert.strictEqual(complex_js.ZERO.equals(complex_js.ZERO, new complex_js(1, 0)), false);
        
        done();
    });
});