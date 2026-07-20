let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.mul', function(done) {
        // Helper function to check if a value is zero (including -0)
        function isZero(value) {
            return value === 0 || value === -0;
        }
        
        // Test 1: ZERO multiplied by any finite complex number should return ZERO
        let result1 = complex_js.ZERO.mul(3, 4);
        assert.ok(isZero(result1.re));
        assert.ok(isZero(result1.im));
        
        // Test 2: ZERO multiplied by real number should return ZERO
        let result2 = complex_js.ZERO.mul(5, 0);
        assert.ok(isZero(result2.re));
        assert.ok(isZero(result2.im));
        
        // Test 3: ZERO multiplied by pure imaginary number should return ZERO
        let result3 = complex_js.ZERO.mul(0, 7);
        assert.ok(isZero(result3.re));
        assert.ok(isZero(result3.im));
        
        // Test 4: ZERO multiplied by another ZERO should return ZERO
        let result4 = complex_js.ZERO.mul(0, 0);
        assert.ok(isZero(result4.re));
        assert.ok(isZero(result4.im));
        
        // Test 5: ZERO multiplied by INFINITY should return NAN
        let result5 = complex_js.ZERO.mul(Infinity, 0);
        assert.ok(isNaN(result5.re));
        assert.ok(isNaN(result5.im));
        
        // Test 6: ZERO multiplied by complex infinity should return NAN
        let result6 = complex_js.ZERO.mul(Infinity, Infinity);
        assert.ok(isNaN(result6.re));
        assert.ok(isNaN(result6.im));
        
        // Test 7: ZERO multiplied by negative numbers
        let result7 = complex_js.ZERO.mul(-2, -3);
        assert.ok(isZero(result7.re));
        assert.ok(isZero(result7.im));
        
        // Test 8: ZERO multiplied by fractional numbers
        let result8 = complex_js.ZERO.mul(0.5, 1.7);
        assert.ok(isZero(result8.re));
        assert.ok(isZero(result8.im));
        
        done();
    });
});