let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.round', function(done) {
        // Test rounding ZERO with no places (default 0)
        let result1 = complex_js.ZERO.round();
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);
        
        // Test rounding ZERO with 2 decimal places
        let result2 = complex_js.ZERO.round(2);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);
        
        // Test rounding a complex number with decimal values
        let complexNum = new complex_js(3.14159, 2.71828);
        let result3 = complexNum.round(2);
        assert.strictEqual(result3.re, 3.14);
        assert.strictEqual(result3.im, 2.72);
        
        // Test rounding with 0 decimal places
        let result4 = complexNum.round(0);
        assert.strictEqual(result4.re, 3);
        assert.strictEqual(result4.im, 3);
        
        // Test rounding negative values
        let negativeComplex = new complex_js(-1.567, -2.834);
        let result5 = negativeComplex.round(1);
        assert.strictEqual(result5.re, -1.6);
        assert.strictEqual(result5.im, -2.8);
        
        // Test rounding with higher precision
        let preciseComplex = new complex_js(1.23456789, -9.87654321);
        let result6 = preciseComplex.round(3);
        assert.strictEqual(result6.re, 1.235);
        assert.strictEqual(result6.im, -9.877);
        
        done();
    });
});