let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add', function(done) {
        // Test adding two finite numbers to ZERO
        let result1 = complex_js.ZERO.add(3, 4);
        assert.strictEqual(result1.re, 3);
        assert.strictEqual(result1.im, 4);

        // Test adding zero to ZERO
        let result2 = complex_js.ZERO.add(0, 0);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);

        // Test adding negative numbers to ZERO
        let result3 = complex_js.ZERO.add(-2, -5);
        assert.strictEqual(result3.re, -2);
        assert.strictEqual(result3.im, -5);

        // Test adding only real part to ZERO
        let result4 = complex_js.ZERO.add(7, 0);
        assert.strictEqual(result4.re, 7);
        assert.strictEqual(result4.im, 0);

        // Test adding only imaginary part to ZERO
        let result5 = complex_js.ZERO.add(0, 3);
        assert.strictEqual(result5.re, 0);
        assert.strictEqual(result5.im, 3);

        // Test adding infinity to ZERO (should return INFINITY)
        let result6 = complex_js.ZERO.add(Infinity, 0);
        assert.strictEqual(result6, complex_js.INFINITY);

        // Test adding imaginary infinity to ZERO (should return INFINITY)
        let result7 = complex_js.ZERO.add(0, Infinity);
        assert.strictEqual(result7, complex_js.INFINITY);

        // Test adding both real and imaginary infinity to ZERO (should return INFINITY)
        let result8 = complex_js.ZERO.add(Infinity, Infinity);
        assert.strictEqual(result8, complex_js.INFINITY);

        done();
    });
});