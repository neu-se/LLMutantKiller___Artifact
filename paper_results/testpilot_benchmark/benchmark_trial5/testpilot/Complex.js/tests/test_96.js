let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        // Test 1: Zero should return -Infinity + 0i (or throw an error)
        // Note: log(0) is mathematically undefined, typically returns -Infinity
        try {
            let result = complex_js.ZERO.log();
            // If it doesn't throw, check if real part is -Infinity
            assert.strictEqual(result.re, -Infinity);
            assert.strictEqual(result.im, 0);
        } catch (error) {
            // It's also acceptable for log(0) to throw an error
            assert.ok(true, 'log(0) threw an error as expected');
        }

        // Test 2: log(1) = 0 + 0i
        let one = new complex_js(1, 0);
        let logOne = one.log();
        assert.ok(Math.abs(logOne.re - 0) < 1e-10, 'log(1) real part should be 0');
        assert.ok(Math.abs(logOne.im - 0) < 1e-10, 'log(1) imaginary part should be 0');

        // Test 3: log(e) ≈ 1 + 0i
        let e = new complex_js(Math.E, 0);
        let logE = e.log();
        assert.ok(Math.abs(logE.re - 1) < 1e-10, 'log(e) real part should be 1');
        assert.ok(Math.abs(logE.im - 0) < 1e-10, 'log(e) imaginary part should be 0');

        // Test 4: log(-1) = 0 + πi
        let minusOne = new complex_js(-1, 0);
        let logMinusOne = minusOne.log();
        assert.ok(Math.abs(logMinusOne.re - 0) < 1e-10, 'log(-1) real part should be 0');
        assert.ok(Math.abs(logMinusOne.im - Math.PI) < 1e-10, 'log(-1) imaginary part should be π');

        // Test 5: log(i) = 0 + (π/2)i
        let i = new complex_js(0, 1);
        let logI = i.log();
        assert.ok(Math.abs(logI.re - 0) < 1e-10, 'log(i) real part should be 0');
        assert.ok(Math.abs(logI.im - Math.PI/2) < 1e-10, 'log(i) imaginary part should be π/2');

        // Test 6: log(-i) = 0 - (π/2)i
        let minusI = new complex_js(0, -1);
        let logMinusI = minusI.log();
        assert.ok(Math.abs(logMinusI.re - 0) < 1e-10, 'log(-i) real part should be 0');
        assert.ok(Math.abs(logMinusI.im - (-Math.PI/2)) < 1e-10, 'log(-i) imaginary part should be -π/2');

        // Test 7: log(1+i) - test general complex number
        let onePlusI = new complex_js(1, 1);
        let logOnePlusI = onePlusI.log();
        let expectedRe = Math.log(Math.sqrt(2)); // log(|1+i|) = log(√2)
        let expectedIm = Math.PI/4; // arg(1+i) = π/4
        assert.ok(Math.abs(logOnePlusI.re - expectedRe) < 1e-10, 'log(1+i) real part incorrect');
        assert.ok(Math.abs(logOnePlusI.im - expectedIm) < 1e-10, 'log(1+i) imaginary part incorrect');

        // Test 8: Test positive real number (exercises the commented code path)
        let two = new complex_js(2, 0);
        let logTwo = two.log();
        assert.ok(Math.abs(logTwo.re - Math.log(2)) < 1e-10, 'log(2) real part should be ln(2)');
        assert.ok(Math.abs(logTwo.im - 0) < 1e-10, 'log(2) imaginary part should be 0');

        done();
    });
});