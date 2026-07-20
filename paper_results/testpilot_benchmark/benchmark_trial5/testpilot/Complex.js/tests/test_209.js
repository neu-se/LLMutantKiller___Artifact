let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acoth', function(done) {
        // Test acoth(0) = i*π/2
        let result = complex_js.ZERO.acoth();
        
        // Check real part is 0
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        
        // Check imaginary part is π/2 with tolerance
        let expectedIm = Math.PI / 2;
        let tolerance = 1e-10;
        assert(Math.abs(result.im - expectedIm) < tolerance, 
               `Imaginary part should be π/2, got ${result.im}, expected ${expectedIm}`);
        
        done();
    });
});