let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        // Test 1: Basic functionality - log of ZERO
        let result = complex_js.ZERO.log();
        
        // The logarithm of zero is mathematically undefined/negative infinity
        // Check that we get a Complex number back
        assert(result instanceof complex_js, 'Result should be a Complex number');
        
        // Test 2: Verify the real part is -Infinity (log of magnitude 0)
        assert.strictEqual(result.re, -Infinity, 'Real part should be -Infinity');
        
        // Test 3: Verify the imaginary part is 0 (atan2(0, 0) returns 0)
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        // Test 4: Ensure ZERO itself is not modified
        assert.strictEqual(complex_js.ZERO.re, 0, 'ZERO real part should remain 0');
        assert.strictEqual(complex_js.ZERO.im, 0, 'ZERO imaginary part should remain 0');
        
        // Test 5: Test that calling log multiple times gives consistent results
        let result2 = complex_js.ZERO.log();
        assert.strictEqual(result.re, result2.re, 'Multiple calls should give same real part');
        assert.strictEqual(result.im, result2.im, 'Multiple calls should give same imaginary part');
        
        done();
    });
});