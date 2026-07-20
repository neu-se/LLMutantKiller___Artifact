let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add', function(done) {
        // Test adding zero to zero
        let result1 = complex_js.ZERO.add(complex_js.ZERO);
        assert.equal(result1.re, 0);
        assert.equal(result1.im, 0);

        // Test adding a real number to zero
        let real_num = complex_js(5, 0);
        let result2 = complex_js.ZERO.add(real_num);
        assert.equal(result2.re, 5);
        assert.equal(result2.im, 0);

        // Test adding a pure imaginary number to zero
        let imag_num = complex_js(0, 3);
        let result3 = complex_js.ZERO.add(imag_num);
        assert.equal(result3.re, 0);
        assert.equal(result3.im, 3);

        // Test adding a complex number to zero
        let complex_num = complex_js(2, -4);
        let result4 = complex_js.ZERO.add(complex_num);
        assert.equal(result4.re, 2);
        assert.equal(result4.im, -4);

        // Test adding negative numbers to zero
        let negative_complex = complex_js(-1.5, -2.7);
        let result5 = complex_js.ZERO.add(negative_complex);
        assert.equal(result5.re, -1.5);
        assert.equal(result5.im, -2.7);

        done();
    });
});