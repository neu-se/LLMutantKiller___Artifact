let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asech', function(done) {
        // Test that asech(0) returns positive infinity
        let result = complex_js.ZERO.asech();
        
        // asech(0) should be +∞ (positive infinity)
        assert.strictEqual(result.re, Infinity, 'Real part should be positive infinity');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        done();
    });
    
    })