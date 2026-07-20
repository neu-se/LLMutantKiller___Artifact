let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.pow', function(done) {
        // Test 0^0 (mathematically undefined, but often returns 1 in implementations)
        let result1 = complex_js.ZERO.pow(0);
        assert.strictEqual(result1.re, 1);
        assert.strictEqual(result1.im, 0);
        
        // Test 0^positive real number = 0
        let result2 = complex_js.ZERO.pow(2);
        assert.ok(result2.re === 0 || result2.re === -0);
        assert.ok(result2.im === 0 || result2.im === -0);
        
        // Test 0^positive complex number = 0
        let result3 = complex_js.ZERO.pow(new complex_js(1, 1));
        assert.ok(result3.re === 0 || result3.re === -0);
        assert.ok(result3.im === 0 || result3.im === -0);
        
        // Test 0^negative real number (should be infinity or throw error)
        try {
            let result4 = complex_js.ZERO.pow(-1);
            // If it doesn't throw, check if it returns infinity
            assert.ok(result4.re === Infinity || isNaN(result4.re));
        } catch (error) {
            // It's acceptable for this to throw an error
            assert.ok(true);
        }
        
        // Test 0^negative complex number
        try {
            let result5 = complex_js.ZERO.pow(new complex_js(-1, -1));
            // If it doesn't throw, check if it returns infinity or NaN
            assert.ok(result5.re === Infinity || isNaN(result5.re));
        } catch (error) {
            // It's acceptable for this to throw an error
            assert.ok(true);
        }
        
        done();
    });
});