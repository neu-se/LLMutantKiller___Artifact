let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.mul', function(done) {
        // Test 1: ZERO * real number = ZERO
        let result1 = complex_js.ZERO.mul(5, 0);
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);

        // Test 2: ZERO * complex number = ZERO
        let result2 = complex_js.ZERO.mul(3, 4);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);

        // Test 3: ZERO * ZERO = ZERO
        let result3 = complex_js.ZERO.mul(0, 0);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);

        // Test 4: ZERO * INFINITY = NaN (special case)
        let result4 = complex_js.ZERO.mul(Infinity, 0);
        assert.ok(isNaN(result4.re));
        assert.ok(isNaN(result4.im));

        // Test 5: ZERO * complex infinity = NaN
        let result5 = complex_js.ZERO.mul(Infinity, Infinity);
        assert.ok(isNaN(result5.re));
        assert.ok(isNaN(result5.im));

        // Test 6: ZERO * negative number = ZERO
        let result6 = complex_js.ZERO.mul(-7, -3);
        assert.strictEqual(result6.re, 0);
        assert.strictEqual(result6.im, 0);

        // Test 7: ZERO * pure imaginary = ZERO
        let result7 = complex_js.ZERO.mul(0, 5);
        assert.strictEqual(result7.re, 0);
        assert.strictEqual(result7.im, 0);

        done();
    });
});