let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add', function(done) {
        // Test adding two real numbers
        let result1 = complex_js.ZERO.add(3, 4);
        assert.equal(result1.re, 3);
        assert.equal(result1.im, 4);

        // Test adding zero to zero
        let result2 = complex_js.ZERO.add(0, 0);
        assert.equal(result2.re, 0);
        assert.equal(result2.im, 0);

        // Test adding negative numbers
        let result3 = complex_js.ZERO.add(-2, -5);
        assert.equal(result3.re, -2);
        assert.equal(result3.im, -5);

        // Test adding with one parameter undefined (should handle gracefully)
        let result4 = complex_js.ZERO.add(1);
        assert.equal(result4.re, 1);
        assert.equal(result4.im, 0); // undefined should be treated as 0

        // Test adding decimal numbers
        let result5 = complex_js.ZERO.add(1.5, 2.7);
        assert.equal(result5.re, 1.5);
        assert.equal(result5.im, 2.7);

        // Test infinity cases
        let result6 = complex_js.INFINITY.add(1, 2);
        assert.equal(result6, complex_js.INFINITY);

        let result7 = complex_js.ZERO.add(Infinity, 0);
        assert.equal(result7, complex_js.INFINITY);

        // Test infinity + infinity = NaN case
        let result8 = complex_js.INFINITY.add(Infinity, Infinity);
        assert.equal(result8, complex_js.NAN);

        done();
    });
});