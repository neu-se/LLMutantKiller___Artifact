let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acoth', function(done) {
        // Test acoth(0) 
        let result = complex_js.ZERO.acoth();
        
        // Based on the library's implementation, acoth(0) returns 0 + 0i
        assert.strictEqual(result.re, 0);
        assert.strictEqual(result.im, 0);
        
        done();
    });
    
})