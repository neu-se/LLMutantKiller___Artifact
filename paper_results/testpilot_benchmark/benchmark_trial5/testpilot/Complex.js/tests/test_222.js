let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asech', function(done) {
        // Test that asech(0) returns infinity
        let result = complex_js.ZERO.asech();
        
        // Check that the result is infinity
        assert.strictEqual(result.re, Infinity, 'Real part should be Infinity');
        
        // Check imaginary part with tolerance for floating-point precision
        assert.ok(Math.abs(result.im) < 1e-10, 'Imaginary part should be approximately 0');
        
        done();
    });
    
})