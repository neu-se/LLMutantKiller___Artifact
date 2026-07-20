let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.pow', function(done) {
        // Test 1: Zero exponent should return ONE
        let result1 = complex_js.ZERO.pow(0, 0);
        assert.strictEqual(result1.re, 1);
        assert.strictEqual(result1.im, 0);

        // Test 2: Real positive base with real exponent
        let result2 = complex_js(2, 0).pow(3, 0);
        assert.strictEqual(result2.re, 8);
        assert.strictEqual(result2.im, 0);

        // Test 3: Pure imaginary base with integer exponent
        let result3 = complex_js(0, 2).pow(2, 0);
        assert.strictEqual(result3.re, -4);
        assert.strictEqual(result3.im, 0);

        // Test 4: Pure imaginary base with exponent that gives imaginary result
        let result4 = complex_js(0, 2).pow(1, 0);
        assert.strictEqual(result4.re, 0);
        assert.strictEqual(result4.im, 2);

        // Test 5: Pure imaginary base with exponent that gives negative real result
        let result5 = complex_js(0, 2).pow(2, 0);
        assert.strictEqual(result5.re, -4);
        assert.strictEqual(result5.im, 0);

        // Test 6: Pure imaginary base with exponent that gives negative imaginary result
        let result6 = complex_js(0, 2).pow(3, 0);
        assert.strictEqual(result6.re, 0);
        assert.strictEqual(result6.im, -8);

        // Test 7: Zero base with positive real exponent should return zero
        let result7 = complex_js(0, 0).pow(2, 0);
        assert.strictEqual(result7.re, 0);
        assert.strictEqual(result7.im, 0);

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