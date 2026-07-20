let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.expm1', function(done) {
        // Test 1: expm1() of ZERO should return ZERO
        // Since ZERO = 0 + 0i, expm1(0 + 0i) = exp(0 + 0i) - 1 = 1 - 1 = 0
        let result1 = complex_js.ZERO.expm1();
        assert.strictEqual(result1.re, 0, 'Real part should be 0');
        assert.strictEqual(result1.im, 0, 'Imaginary part should be 0');

        // Test 2: Test with a pure real number (1 + 0i)
        let real_complex = new complex_js(1, 0);
        let result2 = real_complex.expm1();
        let expected_real = Math.expm1(1); // expm1(1) * cos(0) + cosm1(0) = expm1(1) * 1 + 0
        assert.approximately(result2.re, expected_real, 1e-10, 'Real part should match Math.expm1(1)');
        assert.approximately(result2.im, 0, 1e-10, 'Imaginary part should be 0');

        // Test 3: Test with a pure imaginary number (0 + πi)
        let imag_complex = new complex_js(0, Math.PI);
        let result3 = imag_complex.expm1();
        // expm1(0) * cos(π) + cosm1(π) = 0 * (-1) + (-1 - 1) = -2
        // exp(0) * sin(π) = 1 * 0 = 0
        assert.approximately(result3.re, -2, 1e-10, 'Real part should be -2');
        assert.approximately(result3.im, 0, 1e-10, 'Imaginary part should be 0');

        // Test 4: Test with a general complex number (1 + π/2 i)
        let general_complex = new complex_js(1, Math.PI/2);
        let result4 = general_complex.expm1();
        // expm1(1) * cos(π/2) + cosm1(π/2) = expm1(1) * 0 + (0 - 1) = -1
        // exp(1) * sin(π/2) = exp(1) * 1 = exp(1)
        assert.approximately(result4.re, -1, 1e-10, 'Real part should be -1');
        assert.approximately(result4.im, Math.exp(1), 1e-10, 'Imaginary part should be exp(1)');

        // Test 5: Test with negative real part (-1 + 0i)
        let neg_real_complex = new complex_js(-1, 0);
        let result5 = neg_real_complex.expm1();
        let expected_neg_real = Math.expm1(-1);
        assert.approximately(result5.re, expected_neg_real, 1e-10, 'Real part should match Math.expm1(-1)');
        assert.approximately(result5.im, 0, 1e-10, 'Imaginary part should be 0');

        done();
    });
});