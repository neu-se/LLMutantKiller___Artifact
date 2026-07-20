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

        // Test subtracting mixed positive/negative
        let result4 = complex_js.ZERO.sub(1, -3);
        assert.strictEqual(result4.re, -1);
        assert.strictEqual(result4.im, 3);

        // Test Infinity - Infinity = NaN case
        let infinityComplex = complex_js.INFINITY;
        let result5 = infinityComplex.sub(Infinity, 0);
        assert.ok(result5.isNaN());

        // Test Infinity - finite number = Infinity case
        let result6 = infinityComplex.sub(5, 3);
        assert.ok(result6.isInfinite());

        // Test finite - Infinity = Infinity case
        let result7 = complex_js.ZERO.sub(Infinity, 0);
        assert.ok(result7.isInfinite());

        done();
    });
});