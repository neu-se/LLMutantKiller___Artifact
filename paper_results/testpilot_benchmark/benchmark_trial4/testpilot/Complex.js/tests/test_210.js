let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test asech with value 1', function(done) {
        // Test that asech(1) returns 0
        let one = new complex_js(1, 0);
        let result = one.asech();
        
        // asech(1) should be 0
        assert.ok(Math.abs(result.re) < 1e-10, 'Real part should be approximately 0');
        assert.ok(Math.abs(result.im) < 1e-10, 'Imaginary part should be approximately 0');
        
        done();
    });
    
    })