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
        let realNum = complex_js(5, 0);
        let result2 = complex_js.ZERO.add(realNum);
        assert.equal(result2.re, 5);
        assert.equal(result2.im, 0);

        // Test adding a pure imaginary number to zero
        let imagNum = complex_js(0, 3);
        let result3 = complex_js.ZERO.add(imagNum);
        assert.equal(result3.re, 0);
        assert.equal(result3.im, 3);

        // Test adding a complex number to zero
        let complexNum = complex_js(2, -4);
        let result4 = complex_js.ZERO.add(complexNum);
        assert.equal(result4.re, 2);
        assert.equal(result4.im, -4);

        // Test adding negative numbers to zero
        let negativeNum = complex_js(-3, -2);
        let result5 = complex_js.ZERO.add(negativeNum);
        assert.equal(result5.re, -3);
        assert.equal(result5.im, -2);

        done();
    });
});