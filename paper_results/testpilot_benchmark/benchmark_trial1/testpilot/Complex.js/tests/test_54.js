let mocha = require('mocha');
let assert = require('assert');
let Complex = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js multiplication', function(done) {
        // Test 1: Multiply two positive real numbers
        let result1 = new Complex(3).mul(4);
        assert.strictEqual(result1.re, 12);
        assert.strictEqual(result1.im, 0);

        // Test 2: Multiply two complex numbers with real and imaginary parts
        let result2 = new Complex(2, 3).mul(new Complex(1, 4));
        // (2 + 3i) * (1 + 4i) = 2 + 8i + 3i + 12i² = 2 + 11i - 12 = -10 + 11i
        assert.strictEqual(result2.re, -10);
        assert.strictEqual(result2.im, 11);

        // Test 3: Multiply by zero
        let result3 = new Complex(0).mul(new Complex(5, 7));
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);

        // Test 4: Multiply complex number by real number
        let result4 = new Complex(3, 2).mul(5);
        assert.strictEqual(result4.re, 15);
        assert.strictEqual(result4.im, 10);

        // Test 5: Multiply by negative numbers
        let result5 = new Complex(-2, 3).mul(new Complex(4, -1));
        // (-2 + 3i) * (4 - i) = -8 + 2i + 12i - 3i² = -8 + 14i + 3 = -5 + 14i
        assert.strictEqual(result5.re, -5);
        assert.strictEqual(result5.im, 14);

        // Test 6: Multiply purely imaginary numbers
        let result6 = new Complex(0, 2).mul(new Complex(0, 3));
        // (2i) * (3i) = 6i² = -6
        assert.strictEqual(result6.re, -6);
        assert.strictEqual(result6.im, 0);

        done();
    });
});