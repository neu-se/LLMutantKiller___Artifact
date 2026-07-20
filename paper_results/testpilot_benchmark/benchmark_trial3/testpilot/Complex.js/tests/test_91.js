let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        // Test that log of zero returns complex number with -Infinity real part
        let result = complex_js.ZERO.log();
        
        // The real part should be -Infinity (log of magnitude 0)
        assert.strictEqual(result.re, -Infinity, 'Real part should be -Infinity');
        
        // The imaginary part should be 0 (atan2(0,0) = 0)
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        // Verify it returns a Complex object
        assert.ok(result instanceof complex_js, 'Result should be a Complex number');
        
        done();
    });
    
    })