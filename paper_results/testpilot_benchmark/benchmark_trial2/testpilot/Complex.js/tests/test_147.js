let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.atan', function(done) {
        // Test that atan of zero returns zero
        let result = complex_js.ZERO.atan();
        
        // Check that the result is a complex number
        assert(result instanceof complex_js, 'Result should be a complex number');
        
        // Check that atan(0) = 0 + 0i
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        done();
    });
    
    })