let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asec', function(done) {
        // Test 1: Zero input should return (0, Infinity)
        let result1 = complex_js.ZERO.asec();
        assert.strictEqual(result1.re, 0, 'Real part should be 0 for zero input');
        assert.strictEqual(result1.im, Infinity, 'Imaginary part should be Infinity for zero input');

        // Test 2: Real number input (1 + 0i)
        let one = new complex_js(1, 0);
        let result2 = one.asec();
        assert.ok(Math.abs(result2.re - 0) < 1e-10, 'asec(1) should have real part close to 0');
        assert.ok(Math.abs(result2.im - 0) < 1e-10, 'asec(1) should have imaginary part close to 0');

        // Test 3: Pure imaginary input (0 + 1i)
        let i = new complex_js(0, 1);
        let result3 = i.asec();
        assert.ok(typeof result3.re === 'number', 'Real part should be a number');
        assert.ok(typeof result3.im === 'number', 'Imaginary part should be a number');

        // Test 4: Complex number input (1 + 1i)
        let complex = new complex_js(1, 1);
        let result4 = complex.asec();
        assert.ok(typeof result4.re === 'number', 'Real part should be a number for complex input');
        assert.ok(typeof result4.im === 'number', 'Imaginary part should be a number for complex input');

        // Test 5: Negative real input (-1 + 0i)
        let negOne = new complex_js(-1, 0);
        let result5 = negOne.asec();
        assert.ok(Math.abs(result5.re - Math.PI) < 1e-10, 'asec(-1) should have real part close to π');
        assert.ok(Math.abs(result5.im - 0) < 1e-10, 'asec(-1) should have imaginary part close to 0');

        // Test 6: Small non-zero complex number
        let small = new complex_js(0.1, 0.1);
        let result6 = small.asec();
        assert.ok(!isNaN(result6.re), 'Real part should not be NaN');
        assert.ok(!isNaN(result6.im), 'Imaginary part should not be NaN');

        done();
    });
});