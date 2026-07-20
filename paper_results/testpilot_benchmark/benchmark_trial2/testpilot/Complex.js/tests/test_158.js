let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asec', function(done) {
        // Test asec of zero complex number
        let result = complex_js.ZERO.asec();
        
        // Should return Complex(0, Infinity) when input is (0, 0)
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.strictEqual(result.im, Infinity, 'Imaginary part should be Infinity');
        
        done();
    });
    
    })