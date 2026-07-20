let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.round', function(done) {
        // Test rounding ZERO with default places (0)
        let result1 = complex_js.ZERO.round();
        assert.equal(result1.re, 0);
        assert.equal(result1.im, 0);
        
        // Test rounding ZERO with 2 decimal places
        let result2 = complex_js.ZERO.round(2);
        assert.equal(result2.re, 0);
        assert.equal(result2.im, 0);
        
        // Test rounding a complex number with decimal values
        let complex1 = new complex_js(3.14159, 2.71828);
        let result3 = complex1.round(2);
        assert.equal(result3.re, 3.14);
        assert.equal(result3.im, 2.72);
        
        // Test rounding with 0 decimal places (integers)
        let complex2 = new complex_js(3.7, -2.3);
        let result4 = complex2.round(0);
        assert.equal(result4.re, 4);
        assert.equal(result4.im, -2);
        
        // Test rounding with negative decimal places
        let complex3 = new complex_js(123.456, 789.123);
        let result5 = complex3.round(-1);
        assert.equal(result5.re, 120);
        assert.equal(result5.im, 790);
        
        // Test rounding with 1 decimal place
        let complex4 = new complex_js(1.666, -3.333);
        let result6 = complex4.round(1);
        assert.equal(result6.re, 1.7);
        assert.equal(result6.im, -3.3);
        
        done();
    });
});