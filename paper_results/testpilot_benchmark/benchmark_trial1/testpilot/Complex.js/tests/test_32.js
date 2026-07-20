let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sub', function(done) {
        // Test basic subtraction with real numbers
        let result1 = complex_js.ZERO.sub(3, 0);
        assert.strictEqual(result1.re, -3);
        assert.strictEqual(result1.im, 0);

        // Test subtraction with complex numbers
        let result2 = complex_js.ZERO.sub(2, 3);
        assert.strictEqual(result2.re, -2);
        assert.strictEqual(result2.im, -3);

        // Test subtraction with negative numbers
        let result3 = complex_js.ZERO.sub(-1, -2);
        assert.strictEqual(result3.re, 1);
        assert.strictEqual(result3.im, 2);

        // Test subtraction with zero
        let result4 = complex_js.ZERO.sub(0, 0);
        assert.strictEqual(result4.re, 0);
        assert.strictEqual(result4.im, 0);

        // Test subtraction with decimal numbers
        let result5 = complex_js.ZERO.sub(1.5, 2.7);
        assert.approximately(result5.re, -1.5, 1e-10);
        assert.approximately(result5.im, -2.7, 1e-10);

        // Test infinity cases
        let result6 = complex_js.INFINITY.sub(1, 2);
        assert.strictEqual(result6, complex_js.INFINITY);

        let result7 = complex_js.ZERO.sub(Infinity, 0);
        assert.strictEqual(result7, complex_js.INFINITY);

        // Test infinity - infinity = NaN
        let result8 = complex_js.INFINITY.sub(Infinity, 0);
        assert.strictEqual(result8, complex_js.NAN);

        done();
    });
});