let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.isInfinite', function(done) {
        // Test that ZERO is not infinite
        assert.strictEqual(complex_js.ZERO.isInfinite(), false);
        
        // Test that a finite complex number is not infinite
        let finite = new complex_js(3, 4);
        assert.strictEqual(finite.isInfinite(), false);
        
        // Test that a complex number with infinite real part is infinite
        let infiniteReal = new complex_js(Infinity, 5);
        assert.strictEqual(infiniteReal.isInfinite(), true);
        
        // Test that a complex number with infinite imaginary part is infinite
        let infiniteImag = new complex_js(2, Infinity);
        assert.strictEqual(infiniteImag.isInfinite(), true);
        
        // Test that a complex number with both parts infinite is infinite
        let bothInfinite = new complex_js(Infinity, Infinity);
        assert.strictEqual(bothInfinite.isInfinite(), true);
        
        // Test that a complex number with NaN is not infinite
        let nanComplex = new complex_js(NaN, 3);
        assert.strictEqual(nanComplex.isInfinite(), false);
        
        // Test that a complex number with both NaN and Infinity is not infinite
        let nanAndInf = new complex_js(NaN, Infinity);
        assert.strictEqual(nanAndInf.isInfinite(), false);
        
        done();
    });
});