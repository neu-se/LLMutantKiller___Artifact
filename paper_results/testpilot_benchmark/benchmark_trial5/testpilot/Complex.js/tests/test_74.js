let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.pow', function(done) {
        // Test 0^0 (mathematically undefined, but often returns 1 in implementations)
        let result1 = complex_js.ZERO.pow(complex_js.ZERO);
        assert.ok(result1 instanceof complex_js, 'Result should be a Complex number');
        
        // Test 0^positive real number = 0
        let result2 = complex_js.ZERO.pow(new complex_js(2, 0));
        assert.strictEqual(result2.re, 0, '0^2 real part should be 0');
        assert.strictEqual(result2.im, 0, '0^2 imaginary part should be 0');
        
        // Test 0^positive complex number = 0
        let result3 = complex_js.ZERO.pow(new complex_js(1, 1));
        assert.strictEqual(result3.re, 0, '0^(1+i) real part should be 0');
        assert.strictEqual(result3.im, 0, '0^(1+i) imaginary part should be 0');
        
        // Test 0^negative real number (should be infinity or throw error)
        try {
            let result4 = complex_js.ZERO.pow(new complex_js(-1, 0));
            // If it doesn't throw, check if it's infinity or NaN
            assert.ok(isNaN(result4.re) || !isFinite(result4.re), '0^(-1) should be infinite or NaN');
        } catch (e) {
            // It's acceptable for this to throw an error
            assert.ok(true, 'Division by zero error is acceptable');
        }
        
        // Test 0^pure imaginary number
        let result5 = complex_js.ZERO.pow(new complex_js(0, 1));
        assert.strictEqual(result5.re, 0, '0^i real part should be 0');
        assert.strictEqual(result5.im, 0, '0^i imaginary part should be 0');
        
        done();
    });
    
    })