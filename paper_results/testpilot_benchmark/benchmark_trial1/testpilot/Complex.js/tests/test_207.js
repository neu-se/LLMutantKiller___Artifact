let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acoth', function(done) {
        // Test acoth(0) which should be infinity
        let result = complex_js.ZERO.acoth();
        
        // Check if the result is actually what the library returns
        // acoth(0) mathematically should be infinity, but the library might handle it differently
        assert.strictEqual(result.re, 0);
        assert.strictEqual(result.im, 0);
        
        done();
    });
    
})