let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add', function(done) {
        // Test adding two real numbers
        let result1 = complex_js(3).add(complex_js(4));
        assert.equal(result1.re, 7);
        assert.equal(result1.im, 0);

        // Test adding two complex numbers
        let result2 = complex_js(2, 3).add(complex_js(1, 4));
        assert.equal(result2.re, 3);
        assert.equal(result2.im, 7);

        // Test adding a real and a complex number
        let result3 = complex_js(5).add(complex_js(2, -3));
        assert.equal(result3.re, 7);
        assert.equal(result3.im, -3);

        // Test adding zero to a complex number
        let result4 = complex_js(0).add(complex_js(1, 2));
        assert.equal(result4.re, 1);
        assert.equal(result4.im, 2);

        // Test adding negative numbers
        let result5 = complex_js(-2, -3).add(complex_js(-1, -4));
        assert.equal(result5.re, -3);
        assert.equal(result5.im, -7);

        // Test adding conjugate pairs (should result in real number)
        let result6 = complex_js(3, 4).add(complex_js(2, -4));
        assert.equal(result6.re, 5);
        assert.equal(result6.im, 0);

        done();
    });
});