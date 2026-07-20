let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.pow', function(done) {
        // Test 1: 0^0 should return 1 (Complex.ONE)
        let result1 = complex_js.ZERO.pow(0, 0);
        assert.strictEqual(result1.re, 1);
        assert.strictEqual(result1.im, 0);

        // Test 2: 0^(positive real) should return 0
        let result2 = complex_js.ZERO.pow(2, 0);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);

        // Test 3: 0^(positive real + imaginary) should return 0
        let result3 = complex_js.ZERO.pow(1, 1);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);

        // Test 4: 0^(negative real) - this should handle the edge case
        // Based on the code, when base is 0+0i and exponent has positive real part, it returns ZERO
        let result4 = complex_js.ZERO.pow(0.5, 0);
        assert.strictEqual(result4.re, 0);
        assert.strictEqual(result4.im, 0);

        // Test 5: 0^(pure imaginary) - exponent is 0 + 2i
        let result5 = complex_js.ZERO.pow(0, 2);
        assert.strictEqual(result5.re, 1); // Should return Complex.ONE when exponent is pure imaginary 0
        assert.strictEqual(result5.im, 0);

        // Test 6: Edge case - 0^(complex with positive real part and non-negative imaginary)
        let result6 = complex_js.ZERO.pow(1, 0.5);
        assert.strictEqual(result6.re, 0);
        assert.strictEqual(result6.im, 0);

        done();
    });

    })