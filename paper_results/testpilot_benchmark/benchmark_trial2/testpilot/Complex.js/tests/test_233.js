let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.conjugate', function(done) {
        // Test that the conjugate of ZERO is ZERO itself
        let result = complex_js.ZERO.conjugate();
        
        // ZERO should be 0 + 0i, so its conjugate should also be 0 + 0i
        assert.strictEqual(result.re, 0, 'Real part of ZERO conjugate should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part of ZERO conjugate should be 0');
        
        done();
    });
    
    })