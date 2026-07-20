let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asinh', function(done) {
        // Test asinh of zero
        let result = complex_js.ZERO.asinh();
        
        // asinh(0) should equal 0 + 0i
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        done();
    });
    
    })