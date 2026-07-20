let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.div', function(done) {
        // Test 0 / 0 = NaN
        let result1 = complex_js.ZERO.div(0, 0);
        assert.strictEqual(result1, complex_js.NAN);

        // Test 0 / non-zero = 0
        let result2 = complex_js.ZERO.div(3, 4);
        assert.strictEqual(result2, complex_js.ZERO);

        // Test 0 / real number = 0
        let result3 = complex_js.ZERO.div(5, 0);
        assert.strictEqual(result3, complex_js.ZERO);

        // Test 0 / infinity = 0
        let result4 = complex_js.ZERO.div(complex_js.INFINITY);
        assert.strictEqual(result4, complex_js.ZERO);

        // Test division by zero should return infinity
        let nonZero = new complex_js(2, 3);
        let result5 = nonZero.div(0, 0);
        assert.strictEqual(result5, complex_js.INFINITY);

        // Test infinity / infinity = NaN
        let result6 = complex_js.INFINITY.div(complex_js.INFINITY);
        assert.strictEqual(result6, complex_js.NAN);

        // Test infinity / non-zero = infinity
        let result7 = complex_js.INFINITY.div(2, 3);
        assert.strictEqual(result7, complex_js.INFINITY);

        // Test division by real number (d = 0)
        let c1 = new complex_js(6, 8);
        let result8 = c1.div(2, 0);
        assert.strictEqual(result8.re, 3);
        assert.strictEqual(result8.im, 4);

        // Test division where |c| < |d|
        let c2 = new complex_js(1, 2);
        let result9 = c2.div(1, 3); // 1 + 3i
        let expected_re = (1 * (1/3) + 2) / (1 * (1/3) + 3);
        let expected_im = (2 * (1/3) - 1) / (1 * (1/3) + 3);
        assert.ok(Math.abs(result9.re - expected_re) < 1e-10);
        assert.ok(Math.abs(result9.im - expected_im) < 1e-10);

        // Test division where |c| >= |d|
        let c3 = new complex_js(4, 2);
        let result10 = c3.div(3, 1); // 3 + 1i
        let x = 1/3;
        let t = 1 * x + 3;
        let expected_re2 = (4 + 2 * x) / t;
        let expected_im2 = (2 - 4 * x) / t;
        assert.ok(Math.abs(result10.re - expected_re2) < 1e-10);
        assert.ok(Math.abs(result10.im - expected_im2) < 1e-10);

        done();
    });
});