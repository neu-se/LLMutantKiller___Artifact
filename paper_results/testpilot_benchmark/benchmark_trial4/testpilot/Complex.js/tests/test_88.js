let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.expm1', function(done) {
        // Test that ZERO.expm1() returns 0
        // Since expm1(z) = exp(z) - 1, and exp(0) = 1, we expect expm1(0) = 0
        let result = complex_js.ZERO.expm1();
        
        // Check that the result is a complex number with real part 0 and imaginary part 0
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        done();
    });
    
    })