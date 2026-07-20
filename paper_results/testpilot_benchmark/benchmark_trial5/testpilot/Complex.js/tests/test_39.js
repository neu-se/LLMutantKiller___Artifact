let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sub', function(done) {
        // Test 1: ZERO.sub with two real numbers (a=3, b=2)
        // This should result in 0 - (3 + 2i) = -3 - 2i
        let result1 = complex_js.ZERO.sub(3, 2);
        assert.strictEqual(result1.re, -3);
        assert.strictEqual(result1.im, -2);

        // Test 2: ZERO.sub with one real number
        // This should result in 0 - 5 = -5 + 0i
        let result2 = complex_js.ZERO.sub(5);
        assert.strictEqual(result2.re, -5);
        assert.strictEqual(result2.im, 0);

        // Test 3: ZERO.sub with complex object {re, im}
        // This should result in 0 - (4 + 3i) = -4 - 3i
        let result3 = complex_js.ZERO.sub({re: 4, im: 3});
        assert.strictEqual(result3.re, -4);
        assert.strictEqual(result3.im, -3);

        // Test 4: ZERO.sub with another Complex number
        // This should result in 0 - (2 + 7i) = -2 - 7i
        let complexNum = new complex_js(2, 7);
        let result4 = complex_js.ZERO.sub(complexNum);
        assert.strictEqual(result4.re, -2);
        assert.strictEqual(result4.im, -7);

        // Test 5: ZERO.sub with zero values
        // This should result in 0 - 0 = 0 + 0i
        let result5 = complex_js.ZERO.sub(0, 0);
        assert.strictEqual(result5.re, 0);
        assert.strictEqual(result5.im, 0);

        // Test 6: ZERO.sub with negative numbers
        // This should result in 0 - (-2 + (-3)i) = 2 + 3i
        let result6 = complex_js.ZERO.sub(-2, -3);
        assert.strictEqual(result6.re, 2);
        assert.strictEqual(result6.im, 3);

        done();
    });
});