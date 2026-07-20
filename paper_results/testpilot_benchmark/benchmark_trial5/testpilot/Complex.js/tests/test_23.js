let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add', function(done) {
        // Test adding a complex number to ZERO
        let result1 = complex_js.ZERO.add(new complex_js(3, 4));
        assert.equal(result1.re, 3);
        assert.equal(result1.im, 4);

        // Test adding two complex numbers
        let a = new complex_js(2, 3);
        let b = new complex_js(1, -2);
        let result2 = a.add(b);
        assert.equal(result2.re, 3);
        assert.equal(result2.im, 1);

        // Test adding real number to complex number
        let c = new complex_js(5, 2);
        let result3 = c.add(3);
        assert.equal(result3.re, 8);
        assert.equal(result3.im, 2);

        // Test adding zero to a complex number
        let d = new complex_js(4, -1);
        let result4 = d.add(0);
        assert.equal(result4.re, 4);
        assert.equal(result4.im, -1);

        // Test adding a real number to ZERO
        let result5 = complex_js.ZERO.add(-5);
        assert.equal(result5.re, -5);
        assert.equal(result5.im, 0);

        // Test adding complex numbers with negative imaginary parts
        let e = new complex_js(-1, -4);
        let f = new complex_js(2, -1);
        let result6 = e.add(f);
        assert.equal(result6.re, 1);
        assert.equal(result6.im, -5);

        done();
    });
});