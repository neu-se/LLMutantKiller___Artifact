let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sub', function(done) {
        // Test 1: ZERO.sub with real and imaginary parts
        let result1 = complex_js.ZERO.sub(3, 2);
        assert.equal(result1.re, -3, 'Real part should be -3');
        assert.equal(result1.im, -2, 'Imaginary part should be -2');

        // Test 2: ZERO.sub with only real part (imaginary defaults to 0)
        let result2 = complex_js.ZERO.sub(5);
        assert.equal(result2.re, -5, 'Real part should be -5');
        assert.equal(result2.im, 0, 'Imaginary part should be 0');

        // Test 3: ZERO.sub with negative numbers
        let result3 = complex_js.ZERO.sub(-4, -3);
        assert.equal(result3.re, 4, 'Real part should be 4');
        assert.equal(result3.im, 3, 'Imaginary part should be 3');

        // Test 4: ZERO.sub with zero values
        let result4 = complex_js.ZERO.sub(0, 0);
        assert.equal(result4.re, 0, 'Real part should be 0');
        assert.equal(result4.im, 0, 'Imaginary part should be 0');

        // Test 5: ZERO.sub with decimal values
        let result5 = complex_js.ZERO.sub(1.5, 2.7);
        assert.equal(result5.re, -1.5, 'Real part should be -1.5');
        assert.equal(result5.im, -2.7, 'Imaginary part should be -2.7');

        // Test 6: Test infinity cases
        let result6 = complex_js.ZERO.sub(Infinity, 0);
        assert.equal(result6.toString(), complex_js.INFINITY.toString(), 'Should return INFINITY when subtracting infinity from ZERO');

        // Test 7: Test with very large numbers
        let result7 = complex_js.ZERO.sub(1e10, 1e10);
        assert.equal(result7.re, -1e10, 'Real part should be -1e10');
        assert.equal(result7.im, -1e10, 'Imaginary part should be -1e10');

        done();
    });
});