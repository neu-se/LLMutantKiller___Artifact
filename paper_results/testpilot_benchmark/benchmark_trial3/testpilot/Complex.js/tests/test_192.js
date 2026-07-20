let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acosh', function(done) {
        // Test acosh(0) - should return approximately i*π/2
        let result = complex_js.ZERO.acosh();
        
        // acosh(0) = i*π/2, so real part should be 0 and imaginary part should be π/2
        assert(Math.abs(result.re) < 1e-10, 'Real part should be approximately 0');
        assert(Math.abs(result.im - Math.PI/2) < 1e-10, 'Imaginary part should be approximately π/2');
        
        done();
    });
    
    })