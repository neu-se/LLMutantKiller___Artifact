let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sub', function(done) {
        // Test subtracting two finite complex numbers
        let result1 = complex_js.ZERO.sub(3, 4);
        assert.strictEqual(result1.re, -3);
        assert.strictEqual(result1.im, -4);
        
        // Test subtracting zero from zero
        let result2 = complex_js.ZERO.sub(0, 0);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);
        
        // Test subtracting negative numbers
        let result3 = complex_js.ZERO.sub(-2, -5);
        assert.strictEqual(result3.re, 2);
        assert.strictEqual(result3.im, 5);
        
        // Test subtracting when this is infinity and parameter is finite
        let result4 = complex_js.INFINITY.sub(1, 2);
        assert.strictEqual(result4, complex_js.INFINITY);
        
        // Test subtracting when this is finite and parameter is infinity
        let result5 = complex_js.ZERO.sub(Infinity, 0);
        assert.strictEqual(result5, complex_js.INFINITY);
        
        // Test subtracting infinity from infinity (should return NaN)
        let result6 = complex_js.INFINITY.sub(Infinity, Infinity);
        assert.strictEqual(result6, complex_js.NAN);
        
        // Test with decimal values
        let result7 = complex_js.ZERO.sub(1.5, 2.7);
        assert.strictEqual(result7.re, -1.5);
        assert.strictEqual(result7.im, -2.7);
        
        done();
    });
});