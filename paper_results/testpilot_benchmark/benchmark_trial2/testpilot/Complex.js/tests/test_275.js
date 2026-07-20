let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.toVector', function(done) {
        // Test that ZERO.toVector() returns an array with two elements [0, 0]
        let result = complex_js.ZERO.toVector();
        
        // Check that result is an array
        assert(Array.isArray(result), 'toVector() should return an array');
        
        // Check that array has exactly 2 elements
        assert.strictEqual(result.length, 2, 'toVector() should return array with 2 elements');
        
        // Check that both elements are 0 (real and imaginary parts)
        assert.strictEqual(result[0], 0, 'Real part should be 0');
        assert.strictEqual(result[1], 0, 'Imaginary part should be 0');
        
        done();
    });
    
    })