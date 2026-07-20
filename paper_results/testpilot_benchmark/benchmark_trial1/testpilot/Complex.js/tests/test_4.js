let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sign', function(done) {
        // Test that calling sign() on ZERO returns NaN for both real and imaginary parts
        // This is expected behavior since sign of zero involves division by zero
        let result = complex_js.ZERO.sign();
        
        // Both real and imaginary parts should be NaN due to division by zero
        assert(isNaN(result.re), 'Real part should be NaN');
        assert(isNaN(result.im), 'Imaginary part should be NaN');
        
        done();
    });
    
    })