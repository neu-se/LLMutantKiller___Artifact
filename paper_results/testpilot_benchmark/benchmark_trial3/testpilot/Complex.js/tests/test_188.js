let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asinh', function(done) {
        // Test asinh(0) = 0
        let result = complex_js.ZERO.asinh();
        assert(Math.abs(result.re) < 1e-10, 'Real part should be approximately 0');
        assert(Math.abs(result.im) < 1e-10, 'Imaginary part should be approximately 0');
        done();
    });

    })