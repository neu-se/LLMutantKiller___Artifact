let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sub', function(done) {
        // Test 1: ZERO.sub with real numbers
        let result1 = complex_js.ZERO.sub(3, 2);
        assert.equal(result1.re, -3);
        assert.equal(result1.im, -2);

        // Test 2: ZERO.sub with zero values
        let result2 = complex_js.ZERO.sub(0, 0);
        assert.equal(result2.re, 0);
        assert.equal(result2.im, 0);

        // Test 3: ZERO.sub with negative numbers
        let result3 = complex_js.ZERO.sub(-5, -3);
        assert.equal(result3.re, 5);
        assert.equal(result3.im, 3);

        // Test 4: ZERO.sub with decimal numbers
        let result4 = complex_js.ZERO.sub(2.5, 1.7);
        assert.equal(result4.re, -2.5);
        assert.equal(result4.im, -1.7);

        // Test 5: ZERO.sub with only real part (imaginary = 0)
        let result5 = complex_js.ZERO.sub(4, 0);
        assert.equal(result5.re, -4);
        assert.equal(result5.im, 0);

        // Test 6: ZERO.sub with only imaginary part (real = 0)
        let result6 = complex_js.ZERO.sub(0, 6);
        assert.equal(result6.re, 0);
        assert.equal(result6.im, -6);

        // Test 7: Test infinity cases
        let result7 = complex_js.ZERO.sub(Infinity, 0);
        assert.equal(result7.re, -Infinity);
        assert.equal(result7.im, 0);

        // Test 8: Test with large numbers
        let result8 = complex_js.ZERO.sub(1000000, 999999);
        assert.equal(result8.re, -1000000);
        assert.equal(result8.im, -999999);

        done();
    });
});