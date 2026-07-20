let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.exp', function(done) {
        // Test that e^0 = 1 (Euler's identity special case)
        let result = complex_js.ZERO.exp();
        
        // The result should be approximately 1 + 0i
        assert(Math.abs(result.re - 1) < 1e-10, 'Real part should be 1');
        assert(Math.abs(result.im) < 1e-10, 'Imaginary part should be 0');
        
        done();
    });
    
    })