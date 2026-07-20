let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test edge cases for complex.js.ZERO.pow', function(done) {
        // Test with very small numbers (0^0.0001 = 0)
        let result1 = complex_js.ZERO.pow(0.0001, 0);
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);

        // Test with large numbers (0^1000 = 0)
        let result2 = complex_js.ZERO.pow(1000, 0);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);

        // Test with negative imaginary part (0^(1-i) = 0)
        let result3 = complex_js.ZERO.pow(1, -1);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);

        // Test the edge case 0^0 which typically returns NaN
        let result4 = complex_js.ZERO.pow(0, 0);
        assert(isNaN(result4.re));
        assert(isNaN(result4.im));

        done();
    });
});