let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sech', function(done) {
        // Test that sech(0) = 1
        // sech(z) = 1/cosh(z), and cosh(0) = 1, so sech(0) = 1
        let result = complex_js.ZERO.sech();
        
        // Check that the result is approximately 1 + 0i
        assert(Math.abs(result.re - 1) < 1e-10, 'Real part should be 1');
        assert(Math.abs(result.im) < 1e-10, 'Imaginary part should be 0');
        
        done();
    });
    
    })