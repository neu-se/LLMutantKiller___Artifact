let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.round', function(done) {
        // Test rounding with no places specified (default to 0)
        let zero = new complex_js(0, 0);
        let rounded = zero.round();
        assert.equal(rounded.re, 0);
        assert.equal(rounded.im, 0);
        
        // Test rounding a complex number with decimal places
        let complex1 = new complex_js(3.14159, 2.71828);
        let rounded1 = complex1.round(2);
        assert.equal(rounded1.re, 3.14);
        assert.equal(rounded1.im, 2.72);
        
        // Test rounding with 0 decimal places
        let complex2 = new complex_js(3.7, -2.3);
        let rounded2 = complex2.round(0);
        assert.equal(rounded2.re, 4);
        assert.equal(rounded2.im, -2);
        
        // Test rounding with 1 decimal place
        let complex3 = new complex_js(1.234, -5.678);
        let rounded3 = complex3.round(1);
        assert.equal(rounded3.re, 1.2);
        assert.equal(rounded3.im, -5.7);
        
        // Test rounding with 3 decimal places
        let complex4 = new complex_js(0.123456, 0.987654);
        let rounded4 = complex4.round(3);
        assert.equal(rounded4.re, 0.123);
        assert.equal(rounded4.im, 0.988);
        
        // Test that the original complex number is not modified
        let original = new complex_js(1.5, 2.5);
        let originalRe = original.re;
        let originalIm = original.im;
        let rounded5 = original.round(0);
        assert.equal(original.re, originalRe);
        assert.equal(original.im, originalIm);
        assert.equal(rounded5.re, 2);
        assert.equal(rounded5.im, 3);
        
        done();
    });
});