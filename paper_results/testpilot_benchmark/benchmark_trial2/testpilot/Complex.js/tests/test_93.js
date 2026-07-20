let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        // Test that log(0) returns -Infinity + 0i
        let result = complex_js.ZERO.log();
        
        // The real part should be -Infinity (log of 0)
        assert.strictEqual(result.re, -Infinity, 'Real part should be -Infinity');
        
        // The imaginary part should be 0
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        // Verify the result is a Complex number
        assert.ok(result instanceof complex_js, 'Result should be a Complex number');
        
        done();
    });
    
    })