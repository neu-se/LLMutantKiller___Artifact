let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test ZERO conjugate returns same as ZERO', function(done) {
        // Test that conjugate of zero equals zero
        let zero = complex_js.ZERO;
        let conjugate = zero.conjugate();
        
        assert.strictEqual(conjugate.re, 0, 'Real part should be 0');
        assert.strictEqual(conjugate.im, 0, 'Imaginary part should be 0');
        
        done();
    });
    
})