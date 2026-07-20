let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asec', function(done) {
        // Test 1: Zero input should return (0, Infinity)
        let zero = new complex_js(0, 0);
        let result1 = zero.asec();
        assert.strictEqual(result1.re, 0, 'Real part should be 0 for zero input');
        assert.strictEqual(result1.im, Infinity, 'Imaginary part should be Infinity for zero input');

        // Test 2: Real number input (1 + 0i)
        let real1 = new complex_js(1, 0);
        let result2 = real1.asec();
        assert.ok(Math.abs(result2.re - 0) < 1e-10, 'asec(1) should have real part ≈ 0');
        assert.ok(Math.abs(result2.im - 0) < 1e-10, 'asec(1) should have imaginary part ≈ 0');

        // Test 3: Real number input (-1 + 0i)
        let realNeg1 = new complex_js(-1, 0);
        let result3 = realNeg1.asec();
        assert.ok(Math.abs(result3.re - Math.PI) < 1e-10, 'asec(-1) should have real part ≈ π');
        assert.ok(Math.abs(result3.im - 0) < 1e-10, 'asec(-1) should have imaginary part ≈ 0');

        // Test 4: Pure imaginary input (0 + 1i)
        let imag1 = new complex_js(0, 1);
        let result4 = imag1.asec();
        assert.ok(typeof result4.re === 'number', 'Result should have numeric real part');
        assert.ok(typeof result4.im === 'number', 'Result should have numeric imaginary part');

        // Test 5: Complex input (1 + 1i)
        let complex1 = new complex_js(1, 1);
        let result5 = complex1.asec();
        assert.ok(typeof result5.re === 'number', 'Result should have numeric real part');
        assert.ok(typeof result5.im === 'number', 'Result should have numeric imaginary part');
        assert.ok(isFinite(result5.re), 'Real part should be finite');
        assert.ok(isFinite(result5.im), 'Imaginary part should be finite');

        // Test 6: Verify relationship with acos (asec(z) = acos(1/z))
        let z = new complex_js(2, 3);
        let asecResult = z.asec();
        let acosResult = z.inv().acos();
        assert.ok(Math.abs(asecResult.re - acosResult.re) < 1e-10, 'asec(z) should equal acos(1/z) - real part');
        assert.ok(Math.abs(asecResult.im - acosResult.im) < 1e-10, 'asec(z) should equal acos(1/z) - imaginary part');

        done();
    });
});