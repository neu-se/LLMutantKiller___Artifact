let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.cos', function(done) {
        // Test cos(0 + 0i) = 1 + 0i
        let result = complex_js.ZERO.cos();
        
        // cos(0) should equal 1
        assert.strictEqual(result.re, 1, 'Real part should be 1');
        
        // Use tolerance for imaginary part due to floating-point precision
        assert.ok(Math.abs(result.im) < 1e-15, 'Imaginary part should be approximately 0');
        
        done();
    });
    
})