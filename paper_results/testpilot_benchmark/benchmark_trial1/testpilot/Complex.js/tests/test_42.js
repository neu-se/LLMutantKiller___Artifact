let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.mul', function(done) {
        // Test multiplying ZERO with a positive real number
        let result1 = complex_js.ZERO.mul(5);
        assert.equal(result1.re, 0);
        assert.equal(result1.im, 0);

        // Test multiplying ZERO with a negative real number
        let result2 = complex_js.ZERO.mul(-3);
        assert.equal(result2.re, 0);
        assert.equal(result2.im, 0);

        // Test multiplying ZERO with a complex number
        let complexNum = new complex_js(3, 4);
        let result3 = complex_js.ZERO.mul(complexNum);
        assert.equal(result3.re, 0);
        assert.equal(result3.im, 0);

        // Test multiplying ZERO with another zero
        let result4 = complex_js.ZERO.mul(0);
        assert.equal(result4.re, 0);
        assert.equal(result4.im, 0);

        // Test multiplying ZERO with imaginary unit
        let imaginaryUnit = new complex_js(0, 1);
        let result5 = complex_js.ZERO.mul(imaginaryUnit);
        assert.equal(result5.re, 0);
        assert.equal(result5.im, 0);

        // Test multiplying ZERO with a pure imaginary number
        let pureImaginary = new complex_js(0, -2);
        let result6 = complex_js.ZERO.mul(pureImaginary);
        assert.equal(result6.re, 0);
        assert.equal(result6.im, 0);

        done();
    });
});