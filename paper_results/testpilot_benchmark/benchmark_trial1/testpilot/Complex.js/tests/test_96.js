let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        // Test logarithm of zero
        let result = complex_js.ZERO.log();
        
        // Log of zero should have real part as negative infinity
        assert.strictEqual(result.re, -Infinity);
        
        // Log of zero should have imaginary part as 0
        assert.strictEqual(result.im, 0);
        
        done();
    });
    
    })