let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asin', function(done) {
        // Test asin of zero should return zero
        let result = complex_js.ZERO.asin();
        assert.ok(Math.abs(result.re) < 1e-10, 'Real part should be close to 0');
        assert.ok(Math.abs(result.im) < 1e-10, 'Imaginary part should be close to 0');
        done();
    });
});