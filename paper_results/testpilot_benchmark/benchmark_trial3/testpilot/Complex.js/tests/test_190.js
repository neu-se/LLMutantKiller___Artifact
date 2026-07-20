let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acosh', function(done) {
        // Test that ZERO.acosh() returns the expected complex number
        // acosh(0) = i * π/2 (approximately i * 1.5708)
        let result = complex_js.ZERO.acosh();
        
        // Check that result is a complex number object
        assert(typeof result === 'object', 'Result should be an object');
        assert(typeof result.re === 'number', 'Real part should be a number');
        assert(typeof result.im === 'number', 'Imaginary part should be a number');
        
        // For acosh(0), the real part should be 0
        assert(Math.abs(result.re) < 1e-10, 'Real part should be approximately 0');
        
        // For acosh(0), the imaginary part should be π/2
        assert(Math.abs(result.im - Math.PI/2) < 1e-10, 'Imaginary part should be approximately π/2');
        
        done();
    });
    
    })