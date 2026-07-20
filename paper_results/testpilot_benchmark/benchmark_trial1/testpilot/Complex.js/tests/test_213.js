let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test asech with complex number (1, 0)', function(done) {
        // Test asech(1) = 0
        let one = new complex_js(1, 0);
        let result = one.asech();
        
        assert.ok(Math.abs(result.re) < 1e-10, 'Real part should be approximately 0');
        assert.ok(Math.abs(result.im) < 1e-10, 'Imaginary part should be approximately 0');
        
        done();
    });
    
    })