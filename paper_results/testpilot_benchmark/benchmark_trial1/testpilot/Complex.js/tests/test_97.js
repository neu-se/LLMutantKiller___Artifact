let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        // Test that log of zero returns negative infinity
        let result = complex_js.ZERO.log();
        
        // The natural log of 0 should be -Infinity + 0i
        assert.strictEqual(result.re, -Infinity, 'Real part should be -Infinity');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        done();
    });
    
    })