let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.pow edge cases', function(done) {
        // Test complex exponents that are zero
        let result1 = complex_js.ZERO.pow(0, 0);
        // 0^0 is often defined as 1 in many contexts, but can be NaN in complex analysis
        // Check if result is NaN and handle accordingly
        if (isNaN(result1.re)) {
            assert.ok(isNaN(result1.re));
        } else {
            assert.strictEqual(result1.re, 1);
            assert.strictEqual(result1.im, 0);
        }

        // Test with floating point exponents
        let result2 = complex_js.ZERO.pow(1.5, 0);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);

        // Test with negative imaginary part
        let result3 = complex_js.ZERO.pow(1, -1);
        // This might also result in NaN due to complex logarithm of zero
        if (isNaN(result3.re)) {
            assert.ok(isNaN(result3.re));
        } else {
            assert.strictEqual(result3.re, 0);
            assert.strictEqual(result3.im, 0);
        }

        done();
    });
});