let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acsch', function(done) {
        // Test 1: acsch(0) should return Infinity
        let result1 = complex_js.ZERO.acsch();
        assert.strictEqual(result1.re, Infinity, 'acsch(0) real part should be Infinity');
        assert.strictEqual(result1.im, 0, 'acsch(0) imaginary part should be 0');

        // Test 2: acsch of a real positive number
        let real_pos = new complex_js(2, 0);
        let result2 = real_pos.acsch();
        let expected2_re = Math.log(2 + Math.sqrt(4 + 1)); // log(2 + sqrt(5))
        assert.ok(Math.abs(result2.re - expected2_re) < 1e-10, 'acsch(2) real part should match expected value');
        assert.ok(Math.abs(result2.im) < 1e-10, 'acsch(2) imaginary part should be approximately 0');

        // Test 3: acsch of a real negative number
        let real_neg = new complex_js(-1, 0);
        let result3 = real_neg.acsch();
        let expected3_re = Math.log(-1 + Math.sqrt(1 + 1)); // log(-1 + sqrt(2))
        assert.ok(Math.abs(result3.re - expected3_re) < 1e-10, 'acsch(-1) real part should match expected value');
        assert.ok(Math.abs(result3.im) < 1e-10, 'acsch(-1) imaginary part should be approximately 0');

        // Test 4: acsch of a purely imaginary number
        let imag = new complex_js(0, 1);
        let result4 = imag.acsch();
        // For purely imaginary input, we expect a purely imaginary output
        assert.ok(Math.abs(result4.re) < 1e-10, 'acsch(i) real part should be approximately 0');
        assert.ok(Math.abs(result4.im) > 0, 'acsch(i) imaginary part should be non-zero');

        // Test 5: acsch of a general complex number
        let complex_num = new complex_js(1, 1);
        let result5 = complex_num.acsch();
        // Verify it returns a Complex object with finite values
        assert.ok(typeof result5.re === 'number' && isFinite(result5.re), 'acsch(1+i) real part should be finite');
        assert.ok(typeof result5.im === 'number' && isFinite(result5.im), 'acsch(1+i) imaginary part should be finite');

        // Test 6: Verify the mathematical property: csch(acsch(z)) ≈ z for non-zero z
        let test_val = new complex_js(3, 4);
        let acsch_result = test_val.acsch();
        let csch_result = acsch_result.csch();
        assert.ok(Math.abs(csch_result.re - test_val.re) < 1e-10, 'csch(acsch(z)) should equal z (real part)');
        assert.ok(Math.abs(csch_result.im - test_val.im) < 1e-10, 'csch(acsch(z)) should equal z (imaginary part)');

        done();
    });
});