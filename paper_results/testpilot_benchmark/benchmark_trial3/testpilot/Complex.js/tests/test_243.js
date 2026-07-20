let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.ceil', function(done) {
        // Test ZERO with default places (0)
        let result1 = complex_js.ZERO.ceil();
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);
        
        // Test ZERO with 2 decimal places
        let result2 = complex_js.ZERO.ceil(2);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);
        
        // Test with a complex number that has positive real and imaginary parts
        let complex1 = new complex_js(1.234, 2.567);
        let result3 = complex1.ceil();
        assert.strictEqual(result3.re, 2);
        assert.strictEqual(result3.im, 3);
        
        // Test with 2 decimal places
        let result4 = complex1.ceil(2);
        assert.strictEqual(result4.re, 1.24);
        assert.strictEqual(result4.im, 2.57);
        
        // Test with negative real and imaginary parts
        let complex2 = new complex_js(-1.234, -2.567);
        let result5 = complex2.ceil();
        assert.strictEqual(result5.re, -1);
        assert.strictEqual(result5.im, -2);
        
        // Test with 1 decimal place
        let result6 = complex2.ceil(1);
        assert.strictEqual(result6.re, -1.2);
        assert.strictEqual(result6.im, -2.5);
        
        // Test with mixed signs
        let complex3 = new complex_js(-1.7, 2.3);
        let result7 = complex3.ceil();
        assert.strictEqual(result7.re, -1);
        assert.strictEqual(result7.im, 3);
        
        done();
    });
});