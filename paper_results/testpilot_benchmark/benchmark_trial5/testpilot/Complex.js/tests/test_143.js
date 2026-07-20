let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asin', function(done) {
        // Test asin(0) = 0
        let result = complex_js.ZERO.asin();
        
        // asin(0) should return 0 + 0i
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.ok(Math.abs(result.im) < 1e-15, 'Imaginary part should be approximately 0');
        
        done();
    });
    
})