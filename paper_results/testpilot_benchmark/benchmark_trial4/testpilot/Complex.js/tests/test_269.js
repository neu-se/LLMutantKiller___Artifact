let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.clone', function(done) {
        // Test that clone returns a new Complex object
        let cloned = complex_js.ZERO.clone();
        assert(cloned instanceof complex_js, 'Cloned object should be an instance of Complex');
        
        // Test that the cloned object has the same values as ZERO
        assert.strictEqual(cloned.re, 0, 'Real part should be 0');
        assert.strictEqual(cloned.im, 0, 'Imaginary part should be 0');
        
        // Test that the cloned object is a different instance (not the same reference)
        assert.notStrictEqual(cloned, complex_js.ZERO, 'Cloned object should be a different instance');
        
        // Test that modifying the clone doesn't affect the original
        cloned.re = 5;
        cloned.im = 3;
        assert.strictEqual(complex_js.ZERO.re, 0, 'Original ZERO real part should remain 0');
        assert.strictEqual(complex_js.ZERO.im, 0, 'Original ZERO imaginary part should remain 0');
        
        done();
    });
    
    })