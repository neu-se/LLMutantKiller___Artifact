let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.atanh', function(done) {
        // Test atanh of zero
        let result = complex_js.ZERO.atanh();
        
        // atanh(0) should be 0 + 0i
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        done();
    });
    
    })