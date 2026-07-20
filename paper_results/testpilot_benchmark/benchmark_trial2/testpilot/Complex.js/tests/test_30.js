let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sub with real numbers', function(done) {
        // Test subtracting real numbers from zero
        let result1 = complex_js.ZERO.sub(5, 0);
        assert.equal(result1.re, -5);
        assert.equal(result1.im, 0);
        
        let result2 = complex_js.ZERO.sub(-3, 0);
        assert.equal(result2.re, 3);
        assert.equal(result2.im, 0);
        
        done();
    });
    
    })