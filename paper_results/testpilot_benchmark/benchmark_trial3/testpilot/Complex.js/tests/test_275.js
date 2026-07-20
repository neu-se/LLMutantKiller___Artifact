let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.toVector returns array with zero real and imaginary parts', function(done) {
        // Test that ZERO.toVector() returns the correct vector representation
        let result = complex_js.ZERO.toVector();
        
        // Should return an array
        assert(Array.isArray(result), 'toVector should return an array');
        
        // Should have exactly 2 elements (real and imaginary parts)
        assert.strictEqual(result.length, 2, 'Vector should have 2 elements');
        
        // Both real and imaginary parts should be 0
        assert.strictEqual(result[0], 0, 'Real part should be 0');
        assert.strictEqual(result[1], 0, 'Imaginary part should be 0');
        
        done();
    });

    })