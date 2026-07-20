let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.round', function(done) {
        // Test rounding with no places specified (default to 0)
        let result1 = complex_js.ZERO.round();
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);
        
        // Test rounding with 0 places
        let result2 = complex_js.ZERO.round(0);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);
        
        // Test rounding with positive places
        let result3 = complex_js.ZERO.round(2);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);
        
        // Test with a non-zero complex number to verify the rounding logic
        let complex1 = new complex_js(3.14159, 2.71828);
        let rounded1 = complex1.round(2);
        assert.strictEqual(rounded1.re, 3.14);
        assert.strictEqual(rounded1.im, 2.72);
        
        // Test with negative decimal places
        let complex2 = new complex_js(123.456, 789.123);
        let rounded2 = complex2.round(-1);
        assert.strictEqual(rounded2.re, 120);
        assert.strictEqual(rounded2.im, 790);
        
        // Test with 1 decimal place
        let complex3 = new complex_js(1.23456, -4.56789);
        let rounded3 = complex3.round(1);
        assert.strictEqual(rounded3.re, 1.2);
        assert.strictEqual(rounded3.im, -4.6);
        
        done();
    });
});