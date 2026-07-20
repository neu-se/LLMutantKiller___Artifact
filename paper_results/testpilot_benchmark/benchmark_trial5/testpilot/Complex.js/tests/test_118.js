let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.cos', function(done) {
        // Test cos(0) = 1
        let result = complex_js.ZERO.cos();
        assert.strictEqual(result.re, 1, 'Real part of cos(0) should be 1');
        assert.ok(Math.abs(result.im) < 1e-10, 'Imaginary part of cos(0) should be approximately 0');
        done();
    });
});