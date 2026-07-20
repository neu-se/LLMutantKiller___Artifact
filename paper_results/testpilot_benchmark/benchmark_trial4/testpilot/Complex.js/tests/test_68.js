let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test special mathematical cases', function(done) {
        // Test 0^(0+0i) = 1
        let result1 = complex_js.ZERO.pow(0, 0);
        assert.strictEqual(result1.re, 1);
        assert.strictEqual(result1.im, 0);

        // Test 0^(1+0i) = 0
        let result2 = complex_js.ZERO.pow(1, 0);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);

        // Test 0^(2+0i) = 0
        let result3 = complex_js.ZERO.pow(2, 0);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);

        done();
    });
});