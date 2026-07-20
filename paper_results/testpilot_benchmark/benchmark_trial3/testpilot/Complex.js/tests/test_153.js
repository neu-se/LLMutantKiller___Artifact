let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acot', function(done) {
        // Test acot of zero
        let result = complex_js.ZERO.acot();
        
        // acot(0) = π/2
        assert.ok(Math.abs(result.re - Math.PI/2) < 1e-10, 'Real part should be π/2');
        assert.ok(Math.abs(result.im) < 1e-10, 'Imaginary part should be 0');
        
        done();
    });
    
    })