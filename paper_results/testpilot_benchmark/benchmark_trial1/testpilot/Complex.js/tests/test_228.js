let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test ZERO conjugate returns same as ZERO', function(done) {
        // Test that conjugate of zero equals zero
        let zero = complex_js.ZERO;
        let conjugate = zero.conjugate();
        
        assert.strictEqual(conjugate.re, zero.re, 'Real parts should be equal');
        assert.strictEqual(conjugate.im, zero.im, 'Imaginary parts should be equal');
        
        done();
    });
    
    })