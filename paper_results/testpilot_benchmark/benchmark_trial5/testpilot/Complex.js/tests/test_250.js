let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test ZERO constant properties', function(done) {
        // Verify ZERO constant has expected properties
        assert.strictEqual(complex_js.ZERO.re, 0, 'ZERO real part should be 0');
        assert.strictEqual(complex_js.ZERO.im, 0, 'ZERO imaginary part should be 0');
        
        done();
    });
    
    })