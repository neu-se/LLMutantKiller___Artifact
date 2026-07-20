let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sqrt', function(done) {
        // Test that the square root of zero is zero
        let result = complex_js.ZERO.sqrt();
        
        // Check that the result is a complex number with real and imaginary parts both equal to 0
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        // Additional verification: sqrt(0) * sqrt(0) should equal 0
        let squared = result.mul(result);
        assert.strictEqual(squared.re, 0, 'Squared real part should be 0');
        assert.strictEqual(squared.im, 0, 'Squared imaginary part should be 0');
        
        // Verify the result is equivalent to ZERO
        assert.strictEqual(result.equals(complex_js.ZERO), true, 'sqrt(0) should equal ZERO');
        
        done();
    });
    
    })