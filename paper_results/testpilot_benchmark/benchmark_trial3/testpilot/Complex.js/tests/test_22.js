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
        let result4 = complex_js.ZERO.add(complex_js(1, 2));
        assert.equal(result4.re, 1);
        assert.equal(result4.im, 2);

        // Test adding negative numbers
        let result5 = complex_js(-2, -3).add(complex_js(-1, -4));
        assert.equal(result5.re, -3);
        assert.equal(result5.im, -7);

        // Test commutativity: a + b = b + a
        let a = complex_js(3, 2);
        let b = complex_js(1, 5);
        let result6 = a.add(b);
        let result7 = b.add(a);
        assert.equal(result6.re, result7.re);
        assert.equal(result6.im, result7.im);

        done();
    });
});