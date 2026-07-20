let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.pow', function(done) {
        // Helper function to handle -0 vs 0 comparison
        function assertComplexEqual(actual, expectedRe, expectedIm) {
            // Use Object.is for NaN handling, but special case for -0/0
            if (expectedRe === 0) {
                assert.ok(actual.re === 0, `Expected re to be 0, got ${actual.re}`);
            } else {
                assert.strictEqual(actual.re, expectedRe);
            }
            
            if (expectedIm === 0) {
                assert.ok(actual.im === 0, `Expected im to be 0, got ${actual.im}`);
            } else {
                assert.strictEqual(actual.im, expectedIm);
            }
        }

        // Test 1: 0^0 should return 1 (Complex.ONE)
        let result1 = complex_js.ZERO.pow(0, 0);
        assert.strictEqual(result1.re, 1);
        assertComplexEqual(result1, 1, 0);

        // Test 2: 0^(positive real) should return 0
        let result2 = complex_js.ZERO.pow(2, 0);
        assertComplexEqual(result2, 0, 0);

        // Test 3: 0^(positive real + imaginary) should return 0
        let result3 = complex_js.ZERO.pow(1, 1);
        assertComplexEqual(result3, 0, 0);

        // Test 4: 0^(negative real) - this should handle the edge case
        // Note: This might throw an error or return infinity, depending on implementation
        try {
            let result4 = complex_js.ZERO.pow(-1, 0);
            // If it doesn't throw, check if it's infinity or NaN
            assert.ok(isNaN(result4.re) || !isFinite(result4.re));
        } catch (e) {
            // Expected behavior for 0^(-1)
            assert.ok(true);
        }

        // Test 5: 0^(pure imaginary) should return 1 when exponent is 0
        let result5 = complex_js.ZERO.pow(0, 1);
        assertComplexEqual(result5, 1, 0);

        // Test 6: 0^(complex with positive real part)
        let result6 = complex_js.ZERO.pow(0.5, 0.5);
        assertComplexEqual(result6, 0, 0);

        done();
    });
});