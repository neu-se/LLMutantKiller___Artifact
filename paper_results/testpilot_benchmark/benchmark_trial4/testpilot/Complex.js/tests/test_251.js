let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.ceil', function(done) {
        // Test ceil with no places argument (default to 0 decimal places)
        let result1 = new complex_js(3.2, 4.7).ceil();
        assert.equal(result1.re, 4);
        assert.equal(result1.im, 5);

        // Test ceil with negative real and imaginary parts
        let result2 = new complex_js(-3.2, -4.7).ceil();
        assert.equal(result2.re, -3);
        assert.equal(result2.im, -4);

        // Test ceil with 1 decimal place
        let result3 = new complex_js(3.14, 2.67).ceil(1);
        assert.equal(result3.re, 3.2);
        assert.equal(result3.im, 2.7);

        // Test ceil with 2 decimal places
        let result4 = new complex_js(3.141, 2.678).ceil(2);
        assert.equal(result4.re, 3.15);
        assert.equal(result4.im, 2.68);

        // Test ceil with zero values
        let result5 = new complex_js(0, 0).ceil();
        assert.equal(result5.re, 0);
        assert.equal(result5.im, 0);

        // Test ceil with already integer values
        let result6 = new complex_js(5, -3).ceil();
        assert.equal(result6.re, 5);
        assert.equal(result6.im, -3);

        // Test ceil with mixed positive/negative values
        let result7 = new complex_js(-1.1, 2.3).ceil();
        assert.equal(result7.re, -1);
        assert.equal(result7.im, 3);

        done();
    });
});