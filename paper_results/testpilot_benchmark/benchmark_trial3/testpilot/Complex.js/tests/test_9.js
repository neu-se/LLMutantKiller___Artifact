let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sign', function(done) {
        // Test that ZERO.sign() returns 0
        let result = complex_js.ZERO.sign();
        // Check if result is a complex number representing 0
        assert.strictEqual(result.re, 0, 'ZERO.sign() real part should be 0');
        assert.strictEqual(result.im, 0, 'ZERO.sign() imaginary part should be 0');
        done();
    });
})