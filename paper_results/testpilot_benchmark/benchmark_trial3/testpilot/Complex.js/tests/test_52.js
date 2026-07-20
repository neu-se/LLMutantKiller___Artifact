let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.mul', function(done) {
        // Test 1: Multiply two positive real numbers
        let result1 = new complex_js(3, 0).mul(4, 0);
        assert.strictEqual(result1.re, 12);
        assert.strictEqual(result1.im, 0);

        // Test 2: Multiply complex numbers with real and imaginary parts
        let result2 = new complex_js(2, 3).mul(new complex_js(1, 4));
        // (2 + 3i) * (1 + 4i) = 2 + 8i + 3i + 12i² = 2 + 11i - 12 = -10 + 11i
        assert.strictEqual(result2.re, -10);
        assert.strictEqual(result2.im, 11);

        // Test 3: Multiply by zero
        let result3 = new complex_js(5, 7).mul(0);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);

        // Test 4: Multiply complex number by real number
        let result4 = new complex_js(2, -3).mul(5);
        assert.strictEqual(result4.re, 10);
        assert.strictEqual(result4.im, -15);

        // Test 5: Multiply purely imaginary numbers
        let result5 = new complex_js(0, 2).mul(new complex_js(0, 3));
        // (2i) * (3i) = 6i² = -6
        assert.strictEqual(result5.re, -6);
        assert.strictEqual(result5.im, 0);

        // Test 6: Multiply negative numbers
        let result6 = new complex_js(-2, -1).mul(new complex_js(-3, 2));
        // (-2 - i) * (-3 + 2i) = 6 - 4i + 3i - 2i² = 6 - i + 2 = 8 - i
        assert.strictEqual(result6.re, 8);
        assert.strictEqual(result6.im, -1);

        done();
    });
});