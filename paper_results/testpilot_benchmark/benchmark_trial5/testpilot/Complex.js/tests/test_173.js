let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.cosh', function(done) {
        // Test that cosh(0) returns 1
        let result = complex_js.ZERO.cosh();
        
        // cosh(0) should equal 1 + 0i
        assert.strictEqual(result.re, 1, 'Real part should be 1');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        
        done();
    });
    
    })