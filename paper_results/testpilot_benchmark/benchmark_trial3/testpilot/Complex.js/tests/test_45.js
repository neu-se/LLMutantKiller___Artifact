let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.mul', function(done) {
        // Test 1: ZERO multiplied by any finite complex number should return ZERO
        let result1 = complex_js.ZERO.mul(3, 4);
        assert.equal(result1.re, 0);
        assert.equal(result1.im, 0);
        
        // Test 2: ZERO multiplied by real number should return ZERO
        let result2 = complex_js.ZERO.mul(5, 0);
        assert.equal(result2.re, 0);
        assert.equal(result2.im, 0);
        
        // Test 3: ZERO multiplied by pure imaginary number should return ZERO
        let result3 = complex_js.ZERO.mul(0, 7);
        assert.equal(result3.re, 0);
        assert.equal(result3.im, 0);
        
        // Test 4: ZERO multiplied by ZERO should return ZERO
        let result4 = complex_js.ZERO.mul(0, 0);
        assert.equal(result4.re, 0);
        assert.equal(result4.im, 0);
        
        // Test 5: ZERO multiplied by INFINITY should return NAN
        let result5 = complex_js.ZERO.mul(Infinity, 0);
        assert.ok(result5.isNaN());
        
        // Test 6: ZERO multiplied by complex infinity should return NAN
        let result6 = complex_js.ZERO.mul(Infinity, Infinity);
        assert.ok(result6.isNaN());
        
        // Test 7: ZERO multiplied by negative numbers
        let result7 = complex_js.ZERO.mul(-2, -3);
        assert.equal(result7.re, 0);
        assert.equal(result7.im, 0);
        
        done();
    });
});