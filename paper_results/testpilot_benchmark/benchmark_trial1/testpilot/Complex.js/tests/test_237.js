let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.conjugate', function(done) {
        // Test that ZERO.conjugate() returns a complex number with real=0 and imaginary=0
        let result = complex_js.ZERO.conjugate();
        
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        done();
    });
    
});