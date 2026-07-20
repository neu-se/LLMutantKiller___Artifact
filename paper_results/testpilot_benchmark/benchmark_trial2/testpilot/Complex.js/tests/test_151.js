let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acot', function(done) {
        // Test that acot(0) returns π/2
        let result = complex_js.ZERO.acot();
        
        // acot(0) should equal π/2
        let expected = Math.PI / 2;
        
        // Check that the result is a complex number
        assert(typeof result === 'object', 'Result should be a complex number object');
        
        // Check the real part is approximately π/2
        assert(Math.abs(result.re - expected) < 1e-10, 
               `Real part should be π/2 (${expected}), got ${result.re}`);
        
        // Check the imaginary part is approximately 0
        assert(Math.abs(result.im) < 1e-10, 
               `Imaginary part should be 0, got ${result.im}`);
        
        done();
    });
    
    })