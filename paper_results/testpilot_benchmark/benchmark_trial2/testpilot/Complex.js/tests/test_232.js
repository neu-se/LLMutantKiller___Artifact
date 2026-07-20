let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.conjugate', function(done) {
        // Test that ZERO.conjugate() returns the conjugate of zero
        let result = complex_js.ZERO.conjugate();
        
        // The conjugate of 0 + 0i should be 0 - 0i, which is still 0 + 0i
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.strictEqual(result.im, -0, 'Imaginary part should be -0');
        
        // Verify it returns a new Complex instance
        assert.notStrictEqual(result, complex_js.ZERO, 'Should return a new instance');
        assert.strictEqual(typeof result, 'object', 'Should return an object');
        
        done();
    });
    
});