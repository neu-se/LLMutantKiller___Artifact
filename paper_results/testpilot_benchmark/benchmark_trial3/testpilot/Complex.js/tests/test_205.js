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
        let expected2 = Math.log(2 + Math.sqrt(4 + 1)); // log(2 + sqrt(5))
        assert.ok(Math.abs(result2.re - expected2) < 1e-10, 'acsch(2) real part should match expected value');
        assert.ok(Math.abs(result2.im) < 1e-10, 'acsch(2) imaginary part should be approximately 0');

        // Test 3: acsch of a real negative number
        let real_neg = new complex_js(-1, 0);
        let result3 = real_neg.acsch();
        let expected3 = Math.log(-1 + Math.sqrt(1 + 1)); // log(-1 + sqrt(2))
        assert.ok(Math.abs(result3.re - expected3) < 1e-10, 'acsch(-1) real part should match expected value');
        assert.ok(Math.abs(result3.im) < 1e-10, 'acsch(-1) imaginary part should be approximately 0');

        // Test 4: acsch of a complex number
        let complex_num = new complex_js(1, 1);
        let result4 = complex_num.acsch();
        // For complex numbers, acsch(z) = asinh(1/z)
        let inverse = new complex_js(0.5, -0.5); // 1/(1+i) = (1-i)/2 = 0.5 - 0.5i
        let expected4 = inverse.asinh();
        assert.ok(Math.abs(result4.re - expected4.re) < 1e-10, 'acsch(1+i) real part should match asinh(1/(1+i))');
        assert.ok(Math.abs(result4.im - expected4.im) < 1e-10, 'acsch(1+i) imaginary part should match asinh(1/(1+i))');

        // Test 5: acsch of pure imaginary number
        let pure_imag = new complex_js(0, 2);
        let result5 = pure_imag.acsch();
        // acsch(2i) = asinh(1/(2i)) = asinh(-i/2)
        let inverse5 = new complex_js(0, -0.5);
        let expected5 = inverse5.asinh();
        assert.ok(Math.abs(result5.re - expected5.re) < 1e-10, 'acsch(2i) real part should match expected');
        assert.ok(Math.abs(result5.im - expected5.im) < 1e-10, 'acsch(2i) imaginary part should match expected');

        done();
    });
});