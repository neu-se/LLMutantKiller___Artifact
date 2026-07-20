let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sqrt', function(done) {
        // Test that square root of zero is zero
        let result = complex_js.ZERO.sqrt();
        
        // Check that the result is zero (both real and imaginary parts should be 0)
        assert.strictEqual(result.re, 0, 'Real part of sqrt(0) should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part of sqrt(0) should be 0');
        
        // Verify the result is equivalent to ZERO
        assert.strictEqual(result.equals(complex_js.ZERO), true, 'sqrt(0) should equal ZERO');
        
        done();
    });
    
    })