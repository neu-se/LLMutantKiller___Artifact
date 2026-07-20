let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acot', function(done) {
        // Test acot of zero
        let result = complex_js.ZERO.acot();
        
        // acot(0) = π/2
        let expected = Math.PI / 2;
        
        // Check that the result is approximately π/2 with small imaginary part
        assert(Math.abs(result.re - expected) < 1e-10, 
               `Expected real part to be approximately ${expected}, got ${result.re}`);
        assert(Math.abs(result.im) < 1e-10, 
               `Expected imaginary part to be approximately 0, got ${result.im}`);
        
        done();
    });
    
    })