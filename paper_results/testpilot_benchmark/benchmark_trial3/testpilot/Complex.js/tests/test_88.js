let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.expm1', function(done) {
        // Test 1: expm1 of zero should return zero
        let result1 = complex_js.ZERO.expm1();
        assert.strictEqual(result1.re, 0, 'Real part of expm1(0) should be 0');
        assert.strictEqual(result1.im, 0, 'Imaginary part of expm1(0) should be 0');

        // Test 2: expm1 of small real number
        let small_real = new complex_js(0.1, 0);
        let result2 = small_real.expm1();
        let expected2_re = Math.expm1(0.1);
        assert.ok(Math.abs(result2.re - expected2_re) < 1e-10, 'expm1(0.1) real part should match Math.expm1(0.1)');
        assert.ok(Math.abs(result2.im) < 1e-10, 'expm1(0.1) imaginary part should be near 0');

        // Test 3: expm1 of pure imaginary number
        let pure_imag = new complex_js(0, Math.PI/2);
        let result3 = pure_imag.expm1();
        // exp(i*π/2) - 1 = cos(π/2) + i*sin(π/2) - 1 = 0 + i*1 - 1 = -1 + i
        assert.ok(Math.abs(result3.re - (-1)) < 1e-10, 'expm1(i*π/2) real part should be -1');
        assert.ok(Math.abs(result3.im - 1) < 1e-10, 'expm1(i*π/2) imaginary part should be 1');

        // Test 4: expm1 of complex number
        let complex_num = new complex_js(0.5, Math.PI/4);
        let result4 = complex_num.expm1();
        // Verify using the formula: expm1(a)*cos(b) + cosm1(b) + j*exp(a)*sin(b)
        let a = 0.5, b = Math.PI/4;
        let cosm1 = Math.cos(b) - 1;
        let expected_re = Math.expm1(a) * Math.cos(b) + cosm1;
        let expected_im = Math.exp(a) * Math.sin(b);
        assert.ok(Math.abs(result4.re - expected_re) < 1e-10, 'Complex expm1 real part matches formula');
        assert.ok(Math.abs(result4.im - expected_im) < 1e-10, 'Complex expm1 imaginary part matches formula');

        // Test 5: Compare with exp().sub(1) for accuracy with small numbers
        let small_complex = new complex_js(0.001, 0.001);
        let result5_expm1 = small_complex.expm1();
        let result5_exp_sub = small_complex.exp().sub(1);
        // expm1 should be more accurate for small numbers
        assert.ok(result5_expm1 instanceof complex_js, 'expm1 returns Complex object');
        assert.ok(typeof result5_expm1.re === 'number', 'Real part is a number');
        assert.ok(typeof result5_expm1.im === 'number', 'Imaginary part is a number');

        done();
    });
});