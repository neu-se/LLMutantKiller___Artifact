let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sqrt', function(done) {
        // Test that the square root of zero is zero
        let result = complex_js.ZERO.sqrt();
        
        // Check that the result is a Complex number
        assert(result instanceof complex_js, 'Result should be a Complex number');
        
        // Check that both real and imaginary parts are zero
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        done();
    });
    
    })