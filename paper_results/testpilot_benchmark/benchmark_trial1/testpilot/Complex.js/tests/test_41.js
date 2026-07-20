let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sub', function(done) {
        // Test subtracting two real numbers from ZERO
        let result1 = complex_js.ZERO.sub(3, 2);
        assert.equal(result1.re, -3, 'Real part should be -3');
        assert.equal(result1.im, -2, 'Imaginary part should be -2');

        // Test subtracting with one parameter (should subtract from real part only)
        let result2 = complex_js.ZERO.sub(5);
        assert.equal(result2.re, -5, 'Real part should be -5');
        assert.equal(result2.im, 0, 'Imaginary part should be 0');

        // Test subtracting zero from ZERO
        let result3 = complex_js.ZERO.sub(0, 0);
        assert.equal(result3.re, 0, 'Real part should be 0');
        assert.equal(result3.im, 0, 'Imaginary part should be 0');

        // Test subtracting negative numbers
        let result4 = complex_js.ZERO.sub(-2, -3);
        assert.equal(result4.re, 2, 'Real part should be 2');
        assert.equal(result4.im, 3, 'Imaginary part should be 3');

        // Test subtracting a complex object
        let complexNum = new complex_js(4, 6);
        let result5 = complex_js.ZERO.sub(complexNum);
        assert.equal(result5.re, -4, 'Real part should be -4');
        assert.equal(result5.im, -6, 'Imaginary part should be -6');

        // Test subtracting decimal numbers
        let result6 = complex_js.ZERO.sub(1.5, 2.7);
        assert.ok(Math.abs(result6.re - (-1.5)) < 0.0001, 'Real part should be approximately -1.5');
        assert.ok(Math.abs(result6.im - (-2.7)) < 0.0001, 'Imaginary part should be approximately -2.7');

        done();
    });
});