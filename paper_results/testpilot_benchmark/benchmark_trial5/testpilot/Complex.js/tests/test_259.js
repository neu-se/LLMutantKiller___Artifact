let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.ceil', function(done) {
        // Test ceil with no places argument (default to 0 decimal places)
        let result1 = new complex_js(3.2, 4.7).ceil();
        assert.strictEqual(result1.re, 4);
        assert.strictEqual(result1.im, 5);

        // Test ceil with 0 places
        let result2 = new complex_js(3.2, 4.7).ceil(0);
        assert.strictEqual(result2.re, 4);
        assert.strictEqual(result2.im, 5);

        // Test ceil with 1 decimal place
        let result3 = new complex_js(3.14, 4.76).ceil(1);
        assert.strictEqual(result3.re, 3.2);
        assert.strictEqual(result3.im, 4.8);

        // Test ceil with 2 decimal places
        let result4 = new complex_js(3.141, 4.769).ceil(2);
        assert.strictEqual(result4.re, 3.15);
        assert.strictEqual(result4.im, 4.77);

        // Test ceil with negative numbers
        let result5 = new complex_js(-3.2, -4.7).ceil();
        assert.strictEqual(result5.re, -3);
        assert.strictEqual(result5.im, -4);

        // Test ceil with negative decimal places
        let result6 = new complex_js(123.45, 678.91).ceil(-1);
        assert.strictEqual(result6.re, 130);
        assert.strictEqual(result6.im, 680);

        // Test ceil with zero values
        let result7 = new complex_js(0, 0).ceil(2);
        assert.strictEqual(result7.re, 0);
        assert.strictEqual(result7.im, 0);

        // Test ceil with already integer values
        let result8 = new complex_js(5, 7).ceil(1);
        assert.strictEqual(result8.re, 5);
        assert.strictEqual(result8.im, 7);

        done();
    });
});