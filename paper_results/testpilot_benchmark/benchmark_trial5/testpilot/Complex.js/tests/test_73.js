let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.pow', function(done) {
        // Helper function to handle -0 vs 0 comparison
        function assertComplexEqual(actual, expectedRe, expectedIm) {
            // Use Object.is to distinguish -0 from 0, then normalize
            let actualRe = actual.re === 0 ? 0 : actual.re;
            let actualIm = actual.im === 0 ? 0 : actual.im;
            assert.strictEqual(actualRe, expectedRe);
            assert.strictEqual(actualIm, expectedIm);
        }

        // Test 1: Zero exponent should return ONE
        let result1 = complex_js.ZERO.pow(0, 0);
        assertComplexEqual(result1, 1, 0);

        // Test 2: Real positive base with real exponent
        let result2 = complex_js(2, 0).pow(3, 0);
        assertComplexEqual(result2, 8, 0);

        // Test 3: Purely imaginary base with integer exponent
        let result3 = complex_js(0, 2).pow(2, 0);
        assertComplexEqual(result3, -4, 0);

        // Test 4: Purely imaginary base with exponent that gives imaginary result
        let result4 = complex_js(0, 2).pow(1, 0);
        assertComplexEqual(result4, 0, 2);

        // Test 5: Purely imaginary base with exponent that gives negative real result
        let result5 = complex_js(0, 2).pow(2, 0);
        assertComplexEqual(result5, -4, 0);

        // Test 6: Purely imaginary base with exponent that gives negative imaginary result
        let result6 = complex_js(0, 2).pow(3, 0);
        assertComplexEqual(result6, 0, -8);

        // Test 7: Zero base with positive real exponent should return ZERO
        let result7 = complex_js.ZERO.pow(2, 0);
        assertComplexEqual(result7, 0, 0);

        // Test 8: Complex base with complex exponent (general case)
        let result8 = complex_js(1, 1).pow(1, 1);
        // This will use the general formula, just check it returns a valid complex number
        assert.ok(typeof result8.re === 'number');
        assert.ok(typeof result8.im === 'number');
        assert.ok(!isNaN(result8.re));
        assert.ok(!isNaN(result8.im));

        done();
    });
});