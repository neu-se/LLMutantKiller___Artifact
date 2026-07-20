let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test asech with other values for comparison', function(done) {
        // Test asech(1) = 0 (known mathematical identity)
        let one = new complex_js(1, 0);
        let result1 = one.asech();
        
        assert.ok(Math.abs(result1.re) < 1e-10, 'asech(1) real part should be approximately 0');
        assert.ok(Math.abs(result1.im) < 1e-10, 'asech(1) imaginary part should be approximately 0');
        
        done();
    });
    
    })