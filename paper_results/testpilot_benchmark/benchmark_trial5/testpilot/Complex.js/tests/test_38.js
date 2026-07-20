let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sub', function(done) {
        // Test subtracting a real number from zero
        let result1 = complex_js.ZERO.sub(5);
        assert.equal(result1.re, -5);
        assert.equal(result1.im, 0);

        // Test subtracting complex numbers with real and imaginary parts
        let result2 = complex_js.ZERO.sub({re: 4, im: 3});
        assert.equal(result2.re, -4);
        assert.equal(result2.im, -3);

        // Test subtracting a complex number from zero (should return negative)
        let result3 = complex_js.ZERO.sub(new complex_js(2, 5));
        assert.equal(result3.re, -2);
        assert.equal(result3.im, -5);

        // Test subtracting zero from zero
        let result4 = complex_js.ZERO.sub(0);
        assert.equal(result4.re, 0);
        assert.equal(result4.im, 0);

        // Test subtracting with string representation
        let result5 = complex_js.ZERO.sub("3+4i");
        assert.equal(result5.re, -3);
        assert.equal(result5.im, -4);

        // Test subtracting negative numbers
        let result6 = complex_js.ZERO.sub(-2);
        assert.equal(result6.re, 2);
        assert.equal(result6.im, 0);

        done();
    });
});