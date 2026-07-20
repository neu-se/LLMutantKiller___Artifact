let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.cos returns Complex object', function(done) {
        let result = complex_js.ZERO.cos();
        
        // Verify the result is a Complex object
        assert(result instanceof complex_js, 'Result should be a Complex object');
        assert(typeof result.re === 'number', 'Real part should be a number');
        assert(typeof result.im === 'number', 'Imaginary part should be a number');
        
        done();
    });
    
    })