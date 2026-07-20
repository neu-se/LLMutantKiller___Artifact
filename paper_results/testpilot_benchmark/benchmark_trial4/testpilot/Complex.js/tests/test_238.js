let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.conjugate', function(done) {
        // Test that ZERO conjugate returns ZERO (0 + 0i)
        let result = complex_js.ZERO.conjugate();
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.ok(Math.abs(result.im) < 1e-10, 'Imaginary part should be 0');
        done();
    });
});