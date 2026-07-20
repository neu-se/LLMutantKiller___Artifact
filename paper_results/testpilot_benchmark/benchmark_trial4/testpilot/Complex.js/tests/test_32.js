let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sub', function(done) {
        // Test basic subtraction with real numbers
        let result1 = complex_js.ZERO.sub(3, 2);
        assert.strictEqual(result1.re, -3);
        assert.strictEqual(result1.im, -2);

        // Test subtraction with complex object
        let result2 = complex_js.ZERO.sub({re: 5, im: 3});
        assert.strictEqual(result2.re, -5);
        assert.strictEqual(result2.im, -3);

        // Test subtraction with zero
        let result3 = complex_js.ZERO.sub(0, 0);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);

        // Test subtraction with negative numbers
        let result4 = complex_js.ZERO.sub(-2, -4);
        assert.strictEqual(result4.re, 2);
        assert.strictEqual(result4.im, 4);

        // Test infinity cases
        let infinity = complex_js.INFINITY;
        let result5 = infinity.sub(5, 3);
        assert.strictEqual(result5, complex_js.INFINITY);

        // Test infinity - infinity = NaN
        let result6 = infinity.sub(infinity);
        assert.strictEqual(result6, complex_js.NAN);

        // Test finite number minus infinity = infinity
        let finite = new complex_js(2, 3);
        let result7 = finite.sub(infinity);
        assert.strictEqual(result7, complex_js.INFINITY);

        // Test with decimal numbers
        let result8 = complex_js.ZERO.sub(1.5, 2.7);
        assert.strictEqual(result8.re, -1.5);
        assert.strictEqual(result8.im, -2.7);

        done();
    });
});