let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sub', function(done) {
        // Test 1: ZERO.sub with regular numbers
        let result1 = complex_js.ZERO.sub(3, 4);
        assert.strictEqual(result1.re, -3, 'Real part should be -3');
        assert.strictEqual(result1.im, -4, 'Imaginary part should be -4');

        // Test 2: ZERO.sub with zero values
        let result2 = complex_js.ZERO.sub(0, 0);
        assert.strictEqual(result2.re, 0, 'Real part should be 0');
        assert.strictEqual(result2.im, 0, 'Imaginary part should be 0');

        // Test 3: ZERO.sub with negative numbers
        let result3 = complex_js.ZERO.sub(-2, -5);
        assert.strictEqual(result3.re, 2, 'Real part should be 2');
        assert.strictEqual(result3.im, 5, 'Imaginary part should be 5');

        // Test 4: ZERO.sub with mixed positive/negative
        let result4 = complex_js.ZERO.sub(1, -3);
        assert.strictEqual(result4.re, -1, 'Real part should be -1');
        assert.strictEqual(result4.im, 3, 'Imaginary part should be 3');

        // Test 5: ZERO.sub with infinity values
        let result5 = complex_js.ZERO.sub(Infinity, 0);
        assert.strictEqual(result5, complex_js.INFINITY, 'Should return INFINITY when subtracting infinity from ZERO');

        // Test 6: ZERO.sub with NaN values
        let result6 = complex_js.ZERO.sub(NaN, 0);
        assert.strictEqual(result6.re, NaN, 'Real part should be NaN');
        assert.strictEqual(result6.im, 0, 'Imaginary part should be 0');

        // Test 7: ZERO.sub with decimal numbers
        let result7 = complex_js.ZERO.sub(1.5, 2.7);
        assert.strictEqual(result7.re, -1.5, 'Real part should be -1.5');
        assert.strictEqual(result7.im, -2.7, 'Imaginary part should be -2.7');

        done();
    });
});