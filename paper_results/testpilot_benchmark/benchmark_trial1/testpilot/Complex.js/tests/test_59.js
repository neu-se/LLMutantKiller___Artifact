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

        // Test infinity / 0 = infinity (when this is infinity)
        let result5 = complex_js.INFINITY.div(0, 0);
        assert.strictEqual(result5, complex_js.INFINITY);

        // Test infinity / infinity = NaN
        let result6 = complex_js.INFINITY.div(complex_js.INFINITY);
        assert.strictEqual(result6, complex_js.NAN);

        // Test division by real number (d = 0)
        let complex1 = new complex_js(6, 8);
        let result7 = complex1.div(2, 0);
        assert.strictEqual(result7.re, 3);
        assert.strictEqual(result7.im, 4);

        // Test division where |c| < |d|
        let complex2 = new complex_js(1, 2);
        let result8 = complex2.div(1, 3); // c=1, d=3, |c| < |d|
        let expected_re = (1 * (1/3) + 2) / (1 * (1/3) + 3); // (a*x + b) / t
        let expected_im = (2 * (1/3) - 1) / (1 * (1/3) + 3); // (b*x - a) / t
        assert.ok(Math.abs(result8.re - expected_re) < 1e-10);
        assert.ok(Math.abs(result8.im - expected_im) < 1e-10);

        // Test division where |c| >= |d|
        let complex3 = new complex_js(4, 2);
        let result9 = complex3.div(3, 1); // c=3, d=1, |c| >= |d|
        let x = 1/3; // d/c
        let t = 1 * x + 3; // d*x + c
        let expected_re2 = (4 + 2 * x) / t; // (a + b*x) / t
        let expected_im2 = (2 - 4 * x) / t; // (b - a*x) / t
        assert.ok(Math.abs(result9.re - expected_re2) < 1e-10);
        assert.ok(Math.abs(result9.im - expected_im2) < 1e-10);

        done();
    });
});