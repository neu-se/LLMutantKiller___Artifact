let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.exp', function(done) {
        // Test that e^0 = 1 (Euler's identity special case)
        let result = complex_js.ZERO.exp();
        
        // The result should be 1 + 0i
        assert.strictEqual(result.re, 1, 'Real part should be 1');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        // Test that the result is approximately equal to 1
        assert(Math.abs(result.re - 1) < 1e-10, 'Real part should be very close to 1');
        assert(Math.abs(result.im) < 1e-10, 'Imaginary part should be very close to 0');
        
        done();
    });
    
    })