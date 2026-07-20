let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.pow', function(done) {
        // Helper function to check if a number is approximately zero
        function isApproximatelyZero(value, tolerance = 1e-10) {
            return Math.abs(value) < tolerance;
        }

        // Test 1: Zero exponent should return ONE
        let result1 = complex_js.ZERO.pow(0, 0);
        assert.strictEqual(result1.re, 1);
        assert.ok(isApproximatelyZero(result1.im));

        // Test 2: Real positive base with real exponent
        let result2 = complex_js(2, 0).pow(3, 0);
        assert.strictEqual(result2.re, 8);
        assert.ok(isApproximatelyZero(result2.im));

        // Test 3: Purely imaginary base with integer exponent
        let result3 = complex_js(0, 2).pow(2, 0);
        assert.strictEqual(result3.re, -4);
        assert.ok(isApproximatelyZero(result3.im));

        // Test 4: Purely imaginary base with exponent that gives imaginary result
        let result4 = complex_js(0, 2).pow(1, 0);
        assert.ok(isApproximatelyZero(result4.re));
        assert.strictEqual(result4.im, 2);

        // Test 5: Purely imaginary base with exponent that gives negative real result
        let result5 = complex_js(0, 2).pow(2, 0);
        assert.strictEqual(result5.re, -4);
        assert.ok(isApproximatelyZero(result5.im));

        // Test 6: Purely imaginary base with exponent that gives negative imaginary result
        let result6 = complex_js(0, 2).pow(3, 0);
        assert.ok(isApproximatelyZero(result6.re));
        assert.strictEqual(result6.im, -8);

        // Test 7: Zero base with positive real exponent should return zero
        let result7 = complex_js.ZERO.pow(2, 0);
        assert.ok(isApproximatelyZero(result7.re));
        assert.ok(isApproximatelyZero(result7.im));

        // Test 8: Complex base with complex exponent (general case)
        let result8 = complex_js(1, 1).pow(1, 1);
        // This will use the general formula, just check it returns a valid complex number
        assert.ok(typeof result8.re === 'number');
        assert.ok(typeof result8.im === 'number');
        assert.ok(!isNaN(result8.re));
        assert.ok(!isNaN(result8.im));

        // Test 9: Real negative base with real exponent (should use general formula)
        let result9 = complex_js(-2, 0).pow(2, 0);
        assert.strictEqual(result9.re, 4);
        assert.ok(isApproximatelyZero(result9.im)); // Should be approximately 0

        done();
    });
});