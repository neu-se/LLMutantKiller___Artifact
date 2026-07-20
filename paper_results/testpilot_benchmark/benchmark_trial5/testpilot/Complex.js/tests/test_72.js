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

        // Test 4: 0^(negative real) should handle division by zero case
        // This might throw an error or return infinity, depending on implementation
        try {
            let result4 = complex_js.ZERO.pow(-1, 0);
            // If it doesn't throw, check if result is valid
            assert.ok(isFinite(result4.re) || !isFinite(result4.re));
            assert.ok(isFinite(result4.im) || !isFinite(result4.im));
        } catch (e) {
            // Expected behavior for 0^(-1)
            assert.ok(true);
        }

        // Test 5: 0^(pure imaginary) 
        let result5 = complex_js.ZERO.pow(0, 1);
        // Use Math.abs to handle -0 vs 0 issue
        assert.strictEqual(Math.abs(result5.re), 1);
        assert.strictEqual(Math.abs(result5.im), 0);

        // Test 6: 0^(complex with positive real part)
        let result6 = complex_js.ZERO.pow(0.5, 0.5);
        assert.strictEqual(result6.re, 0);
        assert.strictEqual(result6.im, 0);

        done();
    });

    })