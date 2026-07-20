let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.ceil', function(done) {
        // Test ceil with no places argument (default to 0 decimal places)
        let result1 = new complex_js(3.2, -2.7).ceil();
        assert.strictEqual(result1.re, 4);
        assert.strictEqual(result1.im, -2);

        // Test ceil with 0 places
        let result2 = new complex_js(3.2, -2.7).ceil(0);
        assert.strictEqual(result2.re, 4);
        assert.strictEqual(result2.im, -2);

        // Test ceil with 1 decimal place
        let result3 = new complex_js(3.14, -2.76).ceil(1);
        assert.strictEqual(result3.re, 3.2);
        assert.strictEqual(result3.im, -2.7);

        // Test ceil with 2 decimal places
        let result4 = new complex_js(3.141, -2.769).ceil(2);
        assert.strictEqual(result4.re, 3.15);
        assert.strictEqual(result4.im, -2.76);

        // Test ceil with negative places (rounds to tens, hundreds, etc.)
        let result5 = new complex_js(123.45, -67.89).ceil(-1);
        assert.strictEqual(result5.re, 130);
        assert.strictEqual(result5.im, -60);

        // Test ceil with already integer values
        let result6 = new complex_js(5, -3).ceil(1);
        assert.strictEqual(result6.re, 5);
        assert.strictEqual(result6.im, -3);

        // Test ceil with zero values
        let result7 = new complex_js(0, 0).ceil(2);
        assert.strictEqual(result7.re, 0);
        assert.strictEqual(result7.im, 0);

        // Test ceil with positive imaginary part
        let result8 = new complex_js(-1.1, 2.3).ceil(0);
        assert.strictEqual(result8.re, -1);
        assert.strictEqual(result8.im, 3);

        done();
    });
});