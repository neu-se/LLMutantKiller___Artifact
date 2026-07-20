let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.mul', function(done) {
        // Test multiplying zero by a regular complex number
        let result1 = complex_js.ZERO.mul(3, 4);
        assert.ok(result1.re === 0 || result1.re === -0);
        assert.ok(result1.im === 0 || result1.im === -0);
        
        // Test multiplying zero by zero
        let result2 = complex_js.ZERO.mul(0, 0);
        assert.ok(result2.re === 0 || result2.re === -0);
        assert.ok(result2.im === 0 || result2.im === -0);
        
        // Test multiplying zero by a real number
        let result3 = complex_js.ZERO.mul(5, 0);
        assert.ok(result3.re === 0 || result3.re === -0);
        assert.ok(result3.im === 0 || result3.im === -0);
        
        // Test multiplying zero by a purely imaginary number
        let result4 = complex_js.ZERO.mul(0, 7);
        assert.ok(result4.re === 0 || result4.re === -0);
        assert.ok(result4.im === 0 || result4.im === -0);
        
        // Test edge case: zero multiplied by infinity should return NaN
        let result5 = complex_js.ZERO.mul(Infinity, 0);
        assert.ok(isNaN(result5.re));
        assert.ok(isNaN(result5.im));
        
        // Test edge case: zero multiplied by complex infinity
        let result6 = complex_js.ZERO.mul(Infinity, Infinity);
        assert.ok(isNaN(result6.re));
        assert.ok(isNaN(result6.im));
        
        // Test with negative numbers
        let result7 = complex_js.ZERO.mul(-2, -3);
        assert.ok(result7.re === 0 || result7.re === -0);
        assert.ok(result7.im === 0 || result7.im === -0);
        
        done();
    });
});